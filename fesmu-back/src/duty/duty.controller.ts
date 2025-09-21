import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DutyService } from './duty.service';
import { CreateDutyDto } from './dto/create-duty.dto';

@Controller('duty')
export class DutyController {
  constructor(private readonly dutyService: DutyService) {}

  @Post()
  create(@Body() createDutyDto: CreateDutyDto) {
    return this.dutyService.create(createDutyDto);
  }

  @Get()
  findAll() {
    return this.dutyService.findAll();
  }

  @Get('recorded/:id')
  getRecorded(@Param('id') id: string) {
    return this.dutyService.getRecorded(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dutyService.remove(+id);
  }
}
