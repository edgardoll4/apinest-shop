import { SetMetadata } from '@nestjs/common';
import { IValidRoles } from '../interfaces';

export const META_ROLES = 'roles'

// export const RoleProtected = (...args: string[]) => SetMetadata('role-protected', args);
export const RoleProtected = (...args: IValidRoles[]) => {
    return SetMetadata(META_ROLES,args)
};

