import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'point', nullable: true })
    location: string;

    @Column({ default: false })
    assigned: boolean;
}