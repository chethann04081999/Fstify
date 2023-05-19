import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Description } from "./Description";

@Entity()
export class Title extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @CreateDateColumn()
    createdat:string;

    @UpdateDateColumn()
    updatedat:string;

    @OneToMany(()=>Description,(desc)=>desc.title,{eager:true,onDelete:'CASCADE'})
    descriprtions:Description[];
}