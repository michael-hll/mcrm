import { IsString, Length, IsUppercase, IsOptional } from "class-validator";
import { ROLE_CODE_MIN_LENGTH } from "../roles.constants";

export class CreateRoleDto {
    
    @IsString()
    @Length(ROLE_CODE_MIN_LENGTH)
    @IsUppercase()
    code: string;

    @IsString()
    @Length(2)
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}
