import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Point } from "geojson";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @Column('geography', { spatialFeatureType: 'Point', nullable: true, srid: 4326 })
    location: Point;
}
