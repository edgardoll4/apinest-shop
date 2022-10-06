import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities";
import { IJwtPayLoad } from "../interfaces";


@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy //,'jwt'
){
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService

    ) {

        super({
            secretOrKey: configService.get('SECRET_JWT'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    async validate(payload:IJwtPayLoad): Promise<User> { // Se busca Validar la autentificación del usuario


        const { id } = payload;

        const user = await this.userRepository.findOneBy({id}); // Se busca si el usuario existe en DB

        if (!user)
            throw new UnauthorizedException('Token Invalido');

        if (!user.isActive) // Se verifica si esta activo
            throw new UnauthorizedException('Usuario no activo');

        console.log ({user});  // Muestra los datos del usuario en la consola de nestjs
            
        // Request
        return user ;
    }
}