import { Exclude, Expose } from "class-transformer";
import { UpdateUserRoleDto } from "./update-user-role.dto";

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