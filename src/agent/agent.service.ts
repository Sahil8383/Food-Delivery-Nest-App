import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentService {

    constructor(
        @InjectRepository(Agent) private agentRepository: Repository<Agent>,
    ) { }

    findAll() {
        return this.agentRepository.find();
    }

    create(createAgentDto: CreateAgentDto) {
        const agent = this.agentRepository.create({
            ...createAgentDto,
        });

        return this.agentRepository.save(agent);
    }

}
