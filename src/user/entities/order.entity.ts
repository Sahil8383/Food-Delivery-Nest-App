import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "../../agent/entities/agent.entity";
import { User } from "./user.entity";
import { ItemDto } from "../dto/items.dto";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'float', nullable: false })
    amount: number;

    @Column({ type: 'jsonb', array: false, nullable: true})
    orderItems: ItemDto[];

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToOne(() => Agent, agent => agent.id)
    @JoinColumn()
    agent: string;
}