import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Order } from 'src/user/entities/order.entity';
import { AgentService } from 'src/agent/agent.service';
import { Agent } from 'src/agent/entities/agent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Order,Agent]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService, EmailService,AgentService]
})
export class AuthModule {}
