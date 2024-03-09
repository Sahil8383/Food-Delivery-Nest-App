import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Order } from './entities/order.entity';
import { AgentService } from 'src/agent/agent.service';
import { Agent } from 'src/agent/entities/agent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order,Agent])
  ],
  controllers: [UserController],
  providers: [UserService,JwtService,EmailService,AgentService],
})
export class UserModule {}
