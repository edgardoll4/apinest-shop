import { BadRequestException,  Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities';
import { IJwtPayLoad } from './interfaces';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService'); // Variable para que se guarde el error 


  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}


  async create(createUserDto: CreateUserDto) {
  
    try {

      const {password, ...userData} = createUserDto;

      const user = this.userRepository.create(
        {
          ...userData,
          password: bcrypt.hashSync(password,10)
        }
      );

      await this.userRepository.save(user)

      delete user.password; // Eliminar el password para luego enviar el return

      return{ 
        ...user,
        token: this.getJwtToken({username: user.username})
      };
      // TODO: retornar el JWT de acceso

    } catch (error) {

      this.handleDBExceptions(error);

    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any>{

    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { username },
      select: {
        username: true,
        password: true
      }
    });

    if(!user){
      throw new UnauthorizedException('Credenciales erroneas')
    }
    
    if(!bcrypt.compareSync(password, user.password)){
      throw new UnauthorizedException('Credenciales erroneas')
    }

    // console.log (user);
    console.log (`Usuario: '${user.username}' a iniciado sesion`);
    
    return{ 
      ...user,
      token: this.getJwtToken({
        username: user.username
      })
    };
    // TODO retornar el JWT de acceso
  }

  private getJwtToken(payLoad:IJwtPayLoad){

    const token = this.jwtService.sign(payLoad);
    return token;

  }

  private handleDBExceptions(error: any):never {
    this.logger.error(error) //uso del logger para mostrar error por consola
    const msn = `Error: '${error.code}' ==> ${error.detail}`; // Uso de un mensaje personalizado con los datos del objeto error
    throw new BadRequestException(msn)

  }


}
