import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginUserDto {

    // @IsString()
    // @IsEmail()
    // email: string;
    @ApiProperty({
        example: 'username',
        description: 'UserName for login',
        type:String,
        // isArray: true,
    })
    @IsString()
    @MinLength(2)
    username: string;

    // @IsString()
    // @MinLength(2)
    // fullname: string;

    @ApiProperty({
        example: 'pasword',
        description: 'password for login',
        type:String,
        // isArray: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number -SP- La contraseña debe tener una letra mayúscula, minúscula y un número'
    })
    password: string;

}
