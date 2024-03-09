import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('agent')
export class AgentController {
    
    constructor(
        private readonly agentService: AgentService
    ) {}

    @UseInterceptors(CacheInterceptor)
    @CacheKey('agents')
    @CacheTTL(30)
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
