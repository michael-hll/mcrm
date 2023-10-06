import { Exclude, Expose } from "class-transformer";

export class ReturnUserDto {

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
}