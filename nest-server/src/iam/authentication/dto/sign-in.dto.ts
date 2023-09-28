import { IsString, IsEmail, Length, IsLowercase, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
