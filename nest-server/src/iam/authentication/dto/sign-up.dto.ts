import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsLowercase, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @Length(3)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsLowercase()
  @ApiProperty()
  email: string;
}
