import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const RawHeaders = createParamDecorator(
    (data, context: ExecutionContext) => {
        // console.log({data}) // muestra lo que se pase al llamarse e implementarse
        const req = context.switchToHttp().getRequest();
        return req.rawHeaders;
    }
);