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

      const token = this.getJwtToken({id: user.id})
      delete user.password; // Eliminar el password para luego enviar el return
      delete user.id; // Eliminar el id para luego enviar el return

      return{ 
        ...user,
        // token: this.getJwtToken({id: user.id})
        token: token
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
        id: true, //! OJO¡
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
    console.log (`Usuario: '${user.username}' a iniciado sesion`); // muestra en la consula de nestjs 
    
    const token = this.getJwtToken({id: user.id}); // Genera y guarda el token desde el Id en una constante
    delete user.password; // Eliminar el mostrar password para luego enviar el return
    delete user.id; // Eliminar el id para luego enviar el return

    return{ 
      ...user,
      // token: this.getJwtToken({id: user.id})
      token: token
    };
    // TODO retornar el JWT de acceso
  }

  async checkAuthStatus( user: User ){ // Chequea el estado del token y genera un nuevo token del usuario correspondiente
    delete user.roles; // Evita mostrar los roles para luego enviar el return
    return{ 
      ...user,
      token: this.getJwtToken({id: user.id})
      // token: token
    };

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
