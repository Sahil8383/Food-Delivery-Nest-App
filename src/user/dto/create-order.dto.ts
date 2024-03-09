import { User } from "../entities/user.entity";
import { ItemDto } from "./items.dto";

export class CreateOrderDto {
    total: number;
    user: User;
    orderItems: ItemDto[];
    agent: string;
}