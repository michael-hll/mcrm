import { IsString, Length, IsUppercase, IsOptional } from "class-validator";
import { ROLE_CODE_MIN_LENGTH } from "../roles.constants";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    
    @IsString()
    @Length(ROLE_CODE_MIN_LENGTH)
    @IsUppercase()
    @ApiProperty()
    code: string;

    @IsString()
    @Length(2)
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;
}
