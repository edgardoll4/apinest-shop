import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @ApiProperty({
        example: 'Email@user.com',
        description: 'Email of user',
        type:String,
        // isArray: true,
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'username',
        description: 'UserName for login',
        type:String,
        // isArray: true,
    })
    @IsString()
    @MinLength(2)
    username: string;

    @ApiProperty({
        example: 'Full name',
        description: 'Full Name of user',
        type:String,
        // isArray: true,
    })
    @IsString()
    @MinLength(2)
    fullname: string;

    @ApiProperty({
        example: 'pasword',
        description: 'Password for login',
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
