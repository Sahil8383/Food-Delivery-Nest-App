import { Body, Controller, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/restaurants.dto';
import { UpdateRestDto } from './dto/update-rest.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('restaurant')
export class RestaurantController {

    constructor(
        private readonly restaurantService: RestaurantService,
    ) { }
    
    @UseInterceptors(CacheInterceptor)
    @CacheKey('allRest')
    @CacheTTL(10)
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
