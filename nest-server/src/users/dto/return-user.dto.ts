import { IsString, IsEmail, Length, IsOptional, IsLowercase, ValidateNested, Validate } from "class-validator";
import { UpdateUserRoleDto } from "./update-user-role.dto";
import { Type } from "class-transformer";
import { IsRowValueDuplicated } from "src/base/validators/row-duplicate.validator";
import { Exclude, Expose } from "class-transformer";

export class ReturnUserDto {

    @Expose()
    username: string;

    @Exclude()
    password: string;

    @Expose()
    email: string; 

    @Expose()
    phone: string;

    @Expose()
    cellphone: string;

    @Expose()
    country: string;

    @Expose()
    city: string;

    @Expose()
    address1: string;

    @Expose()
    address2: string;

    @Expose()
    zipcode: string;

    @Expose()
    active: boolean;

    @Expose()
    roles: UpdateUserRoleDto[];
}