import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const GetUser = createParamDecorator(
    ( data, context: ExecutionContext) => {
        // console.log({data}) // muestra lo que se pase al llamarse e implementarse
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if(!user)
            throw new InternalServerErrorException('Usuario no encontrado (request)')

        return (!data) ? user: user[data]
        // return user;
    }
);