import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: "users"})
export class User {
    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({unique: true, nullable: false})
    email: string;    

    @Column({nullable: true, default: ''})
    cellphone: string;

    @Column({nullable: true, default: ''})
    phone: string;

    @Column({nullable: true, default: ''})
    country: string;

    @Column({nullable: true, default: ''})
    city: string;

    @Column({nullable: true, default: ''})
    address1: string;

    @Column({nullable: true, default: ''})
    address2: string;

    @Column({nullable: true, default: ''})
    zipcode: string;

    @Column({default: true})
    active: boolean; 
}