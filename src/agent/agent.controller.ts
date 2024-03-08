import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Controller('agent')
export class AgentController {
    
    constructor(
        private readonly agentService: AgentService
    ) {}

    @Get('all')
    findAll() {
        return this.agentService.findAll();
    }

    @Post('create')
    create(@Body() createAgentDto: CreateAgentDto) {
        return this.agentService.create(createAgentDto);
    }

    @Get('closest')
    async findClosestAgent(@Body() location: any) {
        return this.agentService.findClosestAgent(location);
    }
}
