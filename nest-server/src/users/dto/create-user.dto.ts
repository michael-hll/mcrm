import { IsString, IsEmail, Length, IsOptional, IsLowercase, ValidateNested, Validate } from "class-validator";
import { UpdateUserRoleDto } from "./update-user-role.dto";
import { Type } from "class-transformer";
import { IsRowValueDuplicated } from "src/base/validators/object-duplicate.validator";

export class CreateUserDto {

    @IsString()
    @Length(3)
    username: string;

    @IsString()
    @Length(8)
    password: string;

    @IsEmail()
    @IsLowercase()
    email: string; 

    @IsString()
    @Length(5)
    @IsOptional()
    phone: string;

    @IsString()
    @Length(5)
    @IsOptional()
    cellphone: string;

    @IsString()
    @Length(2)
    @IsOptional()
    country: string;

    @IsString()
    @Length(2)
    @IsOptional()
    city: string;

    @IsString()
    @Length(2)
    @IsOptional()
    address1: string;

    @IsString()
    @Length(2)
    @IsOptional()
    address2: string;

    @IsString()
    @Length(2)
    @IsOptional()
    zipcode: string;

    @IsOptional()
    active: boolean;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => UpdateUserRoleDto)
    @IsRowValueDuplicated({}, ['code'])
    roles: UpdateUserRoleDto[];
}