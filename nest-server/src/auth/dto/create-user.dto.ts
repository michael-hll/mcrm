import { Transform } from "class-transformer";
import { IsString, IsEmail, Length, isString, IsOptional, IsLowercase } from "class-validator";

export class CreateUserDto {

    @IsString()
    @Length(3)
    username: string;

    @IsString()
    @Length(8)
    password: string;

    @IsEmail()
    @IsLowercase()
    email: string; 

    @IsString()
    @Length(5)
    @IsOptional()
    phone: string;

    @IsString()
    @Length(5)
    @IsOptional()
    cellphone: string;
}