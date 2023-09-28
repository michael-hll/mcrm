import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: "roles"})
export class Role {
    constructor(partial?: Partial<Role>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    code: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;
}
