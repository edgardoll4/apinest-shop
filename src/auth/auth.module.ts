import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities';
import { JwtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy:'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        // console.log('JWT Secret', configService.get('JWT_SECRET') )
        // console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          // ignoreExpiration: false,
          secret: configService.get<string>('SECRET_JWT'), // Asigna la clave secreta para la generacion del token
          signOptions: { // Se le asigna varios opciones para la generacion del token
            expiresIn:'6h' // Se le asigna un tiempo de ser valido el token
          },
        }
      }
    }),
    // JwtModule.register({
    //   secret:process.env.SECRET_JWT,
    //   signOptions:{
    //     expiresIn:'2h'
    //   }
    // })
  ],
  exports: [
    TypeOrmModule,
    JwtModule,
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
