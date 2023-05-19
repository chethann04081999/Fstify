import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    Name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    age: number

}
