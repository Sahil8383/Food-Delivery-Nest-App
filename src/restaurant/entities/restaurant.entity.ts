import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'point', nullable: true })
    location: string;

    @Column()
    phone: string;

    @OneToMany(() => Menu, menu => menu.id)
    menu: Menu[];
}