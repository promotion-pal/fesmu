import { Body, Controller, Get, Post } from '@nestjs/common';
import { VocationsService } from './vocations.service';
import { CreateVocationDto } from './dto/create-vocations.dto';

@Controller('vocations')
export class VocationsController {
  constructor(private readonly vocationsService: VocationsService) {}

  @Get()
  async get() {
    return await this.vocationsService.get();
  }

  @Post()
  async create(@Body() dto: CreateVocationDto) {
    console.log(dto);
    return await this.vocationsService.create(dto);
  }
}
