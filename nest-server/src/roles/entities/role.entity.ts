import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';

@Entity({name: "roles"})
export class Role {
    constructor(partial?: Partial<Role>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn() 
    code: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];
}
