import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Menu } from './entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Menu]),
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
