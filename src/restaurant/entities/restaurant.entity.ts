import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";
import { Point } from "geojson";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column('geography', { spatialFeatureType: 'Point', nullable: true, srid: 4326 })
    location: Point;

    @Column()
    phone: string;

    @OneToMany(() => Menu, menu => menu.restaurant)
    menu: Menu[];
}