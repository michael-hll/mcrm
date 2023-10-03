import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({name: "apis"})
export class Api {
    constructor(partial?: Partial<Api>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn()
    key: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false})
    module: string;

    @Column({nullable: false})
    module_name: string;

    @Column({nullable: false})
    controller: string;

    @Column({nullable: false})
    controller_name: string;

    @Column({nullable: false})
    api: string;

    @Column({nullable: false})
    api_name: string;

    @JoinTable({
        name: "api_roles",
        joinColumn: {
            name: "api_key",
            referencedColumnName: "key",
        },
        inverseJoinColumn: {
            name: "role_code",
            referencedColumnName: "code"
        }
    })
    @ManyToMany(type => Role, role => role.users)
    roles: Role[];
}