import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsLowercase, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
