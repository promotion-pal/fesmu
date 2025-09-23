import { Body, Controller, Get, Post } from '@nestjs/common';
import { FloorsService } from './floors.service';
import { CreateFloorDto } from './dto/create-floor.dto';

@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  @Get()
  async findAll() {
    return await this.floorsService.findAll();
  }

  @Post()
  async create(@Body() createFloorDto: CreateFloorDto) {
    return await this.floorsService.create(createFloorDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.floorsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
  //   return this.floorsService.update(+id, updateFloorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.floorsService.remove(+id);
  // }
}
