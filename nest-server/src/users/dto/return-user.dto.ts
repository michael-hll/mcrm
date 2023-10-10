import { Exclude, Expose } from "class-transformer";
import { Role } from "src/roles/entities/role.entity";

export class ReturnUserDto {

    @Expose()
    id: number;
        
    @Expose()
    username: string;

    @Exclude()
    password: string;

    @Expose()
    email: string; 

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

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
    roles: Role[];
}