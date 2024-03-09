import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";
import { Point } from "geojson";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;
    
    @Index({ spatial: true })
    @Column('geography', { spatialFeatureType: 'Point', nullable: true, srid: 4326 })
    location: Point;

    @Column({ default: false })
    assigned: boolean;
}