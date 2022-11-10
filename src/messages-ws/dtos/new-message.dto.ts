import { IsString, MinLength } from 'class-validator';


export class NewMessageDto {

    @IsString()
    @MinLength(1)
    message: string;
    
    @IsString()
    @MinLength(1)
    fullname?: string;

    @IsString()
    @MinLength(1)
    contexto?: string;

    @IsString()
    @MinLength(1)
    contextoClient?: string;

    @IsString()
    @MinLength(1)
    id: string;
}