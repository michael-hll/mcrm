import { IsString, IsEmail, Length, IsLowercase, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
