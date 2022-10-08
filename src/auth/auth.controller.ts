import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { IncomingHttpHeaders } from 'http';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities';
import { UserRoleGuard } from './guards';
import { IValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(
    @Body() createUserDto: CreateUserDto
  ){
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto
  ){
    return this.authService.login(loginUserDto)
  }

  @Get('check-status') // Ruta para chequear estado del token
  @Auth()
  checkAuhtStatus(
    @GetUser() user: User,

  ){
    return this.authService.checkAuthStatus(user);
  }


  @Get('privado')
  @UseGuards( AuthGuard() )
  testingPrivateRouter(
    @Req() request: Express.Request, // Obtiene toda la request
    @GetUser() user: User, // Decorador personalizado para la propiedad y obtiene los datos del usuario
    // @GetUser('email','username') userEmail: string,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ){
    // console.log (request) // Muestra por consola la request
    // console.log (request.user) // Muestra por consola la request
    // console.log ({user}) // Muestra por consola la request

    return {
      ok: true,
      mensaje: 'Hola mundo privado',
      usuario: user, // o solamente user
      correo: userEmail,
      rawHeaders,
      headers,
      // usuario: {
      //   username: 'Demo',
      //   roles: ['Demo roles']
      // }
    }
  }

  // @SetMetadata('roles',['admin','super-user']) // Permite asignar metadata
  @Get('protegido')
  @RoleProtected(IValidRoles.admin) // Uso del decorador personalizado para controlar los roles permitidos
  @UseGuards( AuthGuard(), UserRoleGuard )
  testingProtegidoRouter(
    @GetUser() user: User,
  ){

    return {
      ok: true,
      mensaje: 'Hola mundo protegido',
      usuario: user,
    }

  }

  @Get('restringido')
  @Auth(IValidRoles.superUser)
  testingRestringidoRouter(
    @GetUser() user: User,
  ){

    return {
      ok: true,
      mensaje: 'Hola mundo retringido',
      usuario: user,
    }

  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
