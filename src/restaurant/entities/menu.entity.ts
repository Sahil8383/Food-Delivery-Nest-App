import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ type: 'float'})
    price: string;

    @Column()
    description: string;

    @ManyToOne(() => Restaurant, restaurant => restaurant.menu)
    restaurant: string;
}
