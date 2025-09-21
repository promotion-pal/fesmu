import { Controller, Get } from '@nestjs/common';
import { FloorsService } from './floors.service';

@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  // @Post()
  // create(@Body() createFloorDto: CreateFloorDto) {
  //   return this.floorsService.create(createFloorDto);
  // }

  @Get()
  findAll() {
    return this.floorsService.findAll();
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
