import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FloorsService } from './floors.service';
import { FloorDto } from './dto/floor.dto';

@ApiTags('floors')
@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить все этажи',
    description: 'Возвращает список всех этажей в системе',
  })
  @ApiResponse({
    status: 200,
    description: 'Список этажей успешно получен',
    type: [FloorDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  async findAll() {
    return await this.floorsService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Создать новый этаж',
    description: 'Создает новый этаж с указанными параметрами',
  })
  @ApiResponse({
    status: 201,
    description: 'Этаж успешно создан',
    type: FloorDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Неверные входные данные',
  })
  @ApiResponse({
    status: 409,
    description: 'Этаж с таким номером уже существует',
  })
  async create(@Body() dto: FloorDto) {
    return await this.floorsService.create(dto);
  }
}
