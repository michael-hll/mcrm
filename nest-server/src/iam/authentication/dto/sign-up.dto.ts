import { IsString, IsEmail, Length, IsLowercase, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @Length(3)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsLowercase()
  email: string;
}
