import { IsEmail, IsLowercase, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @IsString()
    @Length(3)
    @ApiProperty({type: 'string'})
    username: string;

    @IsString()
    @Length(8)
    @ApiProperty()
    password: string;

    @IsEmail()
    @IsLowercase()
    @ApiProperty()
    email: string; 

    @IsString()
    @IsOptional()
    @ApiProperty()
    firstname: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    lastname: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    cellphone: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    country: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    city: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address1: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address2: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    zipcode: string;

    @IsOptional()
    @ApiProperty()
    active: boolean;
}