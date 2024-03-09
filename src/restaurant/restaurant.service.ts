import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/restaurants.dto';
import { UpdateRestDto } from './dto/update-rest.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class RestaurantService {

    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    ) { }

    findAll() {
        return this.restaurantRepository.find({
            relations: ['menu'],
        });
    }

    create(createRestaurantDto: CreateRestaurantDto) {
        const newRestaurant = this.restaurantRepository.create({
            ...createRestaurantDto,
        });
        return this.restaurantRepository.save(newRestaurant);
    }


    async update(updateRestDto: UpdateRestDto) {
        const restaurant = await this.restaurantRepository.findOne({
            where: {
                id: updateRestDto.id,
            },
            relations: ['menu'],
        });
    
        if (!restaurant) {
            return 'Restaurant not found.'
        }
    
        const updatedMenus: Menu[] = [
            ...restaurant.menu,
        ];
        for (const menuDto of updateRestDto.menu) {
            const existingMenu = restaurant.menu.find(menu => menu.name === menuDto.name);
    
            if (existingMenu) {
                existingMenu.price = menuDto.price;
                existingMenu.description = menuDto.description;
                await this.menuRepository.save(existingMenu);
                updatedMenus.push(existingMenu);
            } else {
                const newMenu = this.menuRepository.create({
                    ...menuDto,
                    restaurant: restaurant.id,
                });
                const savedMenu = await this.menuRepository.save(newMenu);
                updatedMenus.push(savedMenu);
            }
        }

        restaurant.menu = updatedMenus;
        await this.restaurantRepository.save(restaurant);
    
        return restaurant;
    }
}
