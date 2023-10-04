import { IsString, IsEmail, Length, IsOptional, IsLowercase, ValidateNested, Validate } from "class-validator";
import { UpdateUserRoleDto } from "./update-user-role.dto";
import { Type } from "class-transformer";
import { IsRowValueDuplicated } from "src/base/validators/row-duplicate.validator";
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
    @Length(5)
    @IsOptional()
    @ApiProperty()
    phone: string;

    @IsString()
    @Length(5)
    @IsOptional()
    @ApiProperty()
    cellphone: string;

    @IsString()
    @Length(2)
    @IsOptional()
    @ApiProperty()
    country: string;

    @IsString()
    @Length(2)
    @IsOptional()
    @ApiProperty()
    city: string;

    @IsString()
    @Length(2)
    @IsOptional()
    @ApiProperty()
    address1: string;

    @IsString()
    @Length(2)
    @IsOptional()
    @ApiProperty()
    address2: string;

    @IsString()
    @Length(2)
    @IsOptional()
    @ApiProperty()
    zipcode: string;

    @IsOptional()
    @ApiProperty()
    active: boolean;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => UpdateUserRoleDto)
    @IsRowValueDuplicated({}, ['code'])
    @ApiProperty({isArray: true, type: UpdateUserRoleDto})
    roles: UpdateUserRoleDto[];
}