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

    async findClosestAgent(location: any): Promise<Agent | null> {
        const agents = await this.findAll();
        let closestAgent: Agent | null = null;
        let minDistance = Number.MAX_VALUE;

        for (const agent of agents) {
            const distance = this.haversineDistance(location.location, agent.location);
            if (distance < minDistance) {
                minDistance = distance;
                closestAgent = agent;
            }
        }

        return closestAgent;
    }

    private haversineDistance(coord1: any, coord2: any): number {
        const R = 6371;
        const dLat = this.deg2rad(coord2.x - coord1.x);
        const dLon = this.deg2rad(coord2.y - coord1.y);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(coord1.x)) * Math.cos(this.deg2rad(coord2.x)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; 
        return distance;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
