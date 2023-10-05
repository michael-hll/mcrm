import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class UpdatePasswordDto {

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @Length(8)
    @ApiProperty()
    password: string;

    @IsString()
    @Length(8)
    @ApiProperty()
    newpassword: string;
}