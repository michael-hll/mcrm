import { Api } from 'src/iam/authorization/apis/entities/api.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Expose } from "class-transformer";

@Entity({name: "roles", orderBy: {
    code: 'ASC'
}})
export class Role {
    constructor(partial?: Partial<Role>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn() 
    @Expose()
    code: string;

    @Column({nullable: false})
    @Expose()
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false, default: '#339af0'})
    color: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];

    @ManyToMany(type => Api, api => api.roles)
    apis: Api[];
}
