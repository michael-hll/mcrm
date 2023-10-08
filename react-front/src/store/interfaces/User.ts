export interface User {
    username?: string;
    password?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    cellphone?: string;
    country?: string;
    city?: string;
    address1?: string;
    address2?: string;
    zipcode?: string;
    active?: true;
}

export const InitUserInstance = {
    email: '',
    username: '',
    active: true,
    address1: '',
    address2: '',
    cellphone: '',
    phone: '',
    country: '',
    city: '',
    zipcode: '',
    firstname: '',
    lastname: '',
};