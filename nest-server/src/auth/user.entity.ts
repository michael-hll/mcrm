import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: "users"})
export class User {
    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({unique: true, nullable: false})
    email: string;    

    @Column({nullable: true})
    cellphone: string;

    @Column({nullable: true})
    phone: string;
}