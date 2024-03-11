import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Menu } from 'src/restaurant/entities/menu.entity';
import { AgentService } from 'src/agent/agent.service';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly agentService: AgentService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['orders']
    })
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async profile(id: string) {

    const profile = await this.cacheManager.get(`profile-${id}`);
    if (profile) {
      return profile;
    }
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    return {
      ...user,
    };
  }

  async createOrder(createOrderDto: CreateOrderDto, id: string){

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    const totalAmount:number = createOrderDto.orderItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const agent = await this.agentService.findClosestAgent(user.location);
    
    const order = this.orderRepository.create({
      orderItems: createOrderDto.orderItems,
      user,
      amount: totalAmount,
      agent: agent.id,
    });

    return this.orderRepository.save(order);
    

  }

}
