import { Body, Controller, Get, Post } from '@nestjs/common';
import { VocationsService } from './vocations.service';
import { VocationDto } from './dto/vocations.dto';

@Controller('vocations')
export class VocationsController {
  constructor(private readonly vocationsService: VocationsService) {}

  @Get()
  async get() {
    return await this.vocationsService.get();
  }

  @Post()
  async create(@Body() dto: VocationDto) {
    return await this.vocationsService.create(dto);
  }
}
