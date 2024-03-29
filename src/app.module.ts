// ########IMPORT NODEJS################

import { join } from 'path';

// #####################################


// ########IMPORT NESTJS################

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

// ####################################


// ##########IMPORT APP################

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

// ####################################


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ // configuracion de la conexion a la DB con las variables de entorno 
      // ssl:process.env.STAGE === 'prod',
      // extra: {
      //   ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      // },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public')
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
    MessagesWsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
