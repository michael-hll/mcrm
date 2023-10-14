
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UpdateRole {
    code: string;
    operation: string;
}

export class UpdateUserInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    cellphone?: Nullable<string>;
    phone?: Nullable<string>;
    country?: Nullable<string>;
    city?: Nullable<string>;
    address1?: Nullable<string>;
    address2?: Nullable<string>;
    zipcode?: Nullable<string>;
    active?: Nullable<boolean>;
    roles?: Nullable<UpdateRole[]>;
}

export class Role {
    code: string;
}

export class User {
    id: number;
    username?: Nullable<string>;
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    cellphone?: Nullable<string>;
    phone?: Nullable<string>;
    country?: Nullable<string>;
    city?: Nullable<string>;
    address1?: Nullable<string>;
    address2?: Nullable<string>;
    zipcode?: Nullable<string>;
    active?: Nullable<boolean>;
    createAt?: Nullable<Date>;
    roles?: Nullable<Role[]>;
}

export abstract class IQuery {
    users: User[];
    user?: User;
}

export abstract class IMutation {
    updateUser?: User;
}

type Nullable<T> = T | null;
