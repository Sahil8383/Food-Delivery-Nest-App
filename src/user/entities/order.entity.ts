import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "../../agent/entities/agent.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    restaurant: string;

    @Column()
    total: number;

    @Column()
    orderItems: number;

    @OneToOne(() => Agent, agent => agent.id)
    agent: Agent;
}