import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/restaurants.dto';
import { UpdateRestDto } from './dto/update-rest.dto';

@Controller('restaurant')
export class RestaurantController {

    constructor(
        private readonly restaurantService: RestaurantService,
    ) { }

    @Get('all')
    findAll() {
        return this.restaurantService.findAll();
    }

    @Post('create')
    create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto);
    }

    @Patch('update')
    update(@Body() updateRestDto: UpdateRestDto ) {
        return this.restaurantService.update(updateRestDto);
    }
}
