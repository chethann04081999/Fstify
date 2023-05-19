import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Title } from "./Title";

@Entity()
export class Description extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    description:string;

    @CreateDateColumn()
    createdat:string;

    @UpdateDateColumn()
    updatedat:string;

    @ManyToOne(()=>Title,(title)=>title.descriprtions)
    title:Title
}