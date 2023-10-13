
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Role {
    code: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class User {
    id: number;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email: string;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    cellphone?: Nullable<string>;
    phone?: Nullable<string>;
    country?: Nullable<string>;
    city?: Nullable<string>;
    address1?: Nullable<string>;
    address2?: Nullable<string>;
    zipcode?: Nullable<string>;
}

export abstract class IQuery {
    users: User[];
}

type Nullable<T> = T | null;
