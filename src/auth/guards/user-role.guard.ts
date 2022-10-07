import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities';
import { META_ROLES } from '../decorators';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector,
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler()) //uso con el decorador SetMetadata
   
    // Si el validRoles esta vacio o no existe se dejara pasar al usuario
    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;


    // console.log ('UserRoleGuard')
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    // console.log ({validRoles})
    // console.log ({RolesUsuario:user.roles}) // Muestra los roles del usuario

    if (!user)
      throw new BadRequestException('Usuario no encontrado')

    for (const role of user.roles) { // Recorre los roles del usuario
      if ( validRoles.includes( role ) ) // Comprueba si un rol del usuario esta en validRoles
        return true;
    }
    
    throw new ForbiddenException(
      `Usuario '${ user.username }' necesita un rol valido, no tienes los permisos necesarios`
    )
    
  }
}
