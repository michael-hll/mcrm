import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { USER_DEFAULT_ROLE } from '../users.constants';

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
    firstname: string;

    @Column({nullable: true, default: ''})
    lastname: string;

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

    @JoinTable({
        name: "user_roles",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "role_code",
            referencedColumnName: "code"
        }
    })
    @ManyToMany(type => Role, role => role.users)
    roles: Role[];

    @Column({default: true})
    active: boolean; 
}