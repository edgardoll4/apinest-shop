import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from '.';
import { UserRoleGuard } from '../guards';
import { IValidRoles } from '../interfaces';

export function Auth(...roles: IValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles), // Uso del decorador personalizado para controlar los roles permitidos
    // SetMetadata('roles', roles),
    UseGuards( AuthGuard(), UserRoleGuard )
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}