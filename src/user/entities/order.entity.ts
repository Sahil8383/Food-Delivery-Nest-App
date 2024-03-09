import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "../../agent/entities/agent.entity";
import { User } from "./user.entity";

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

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToOne(() => Agent, agent => agent.id)
    @JoinColumn()
    agent: Agent;
}