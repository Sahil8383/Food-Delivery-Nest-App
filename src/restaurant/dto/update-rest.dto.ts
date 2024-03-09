import { Menu } from "../entities/menu.entity";

export class UpdateRestDto {
    id: string;
    menu: Menu[];
}