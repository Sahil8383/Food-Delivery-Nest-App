import { Point } from "geojson";
import { Menu } from "../entities/menu.entity";

export class CreateRestaurantDto {
    name: string;
    location: Point;
    phone: string;
    menu?: Menu[];
}