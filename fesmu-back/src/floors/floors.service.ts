import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FloorEntity } from './entities/floor.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(FloorEntity)
    private readonly floorRepository: Repository<FloorEntity>,
  ) {}

  async findAll() {
    return await this.floorRepository.find();
  }

  async findOneWithConditions(
    conditions: FindOptionsWhere<FloorEntity>,
  ): Promise<FloorEntity> {
    console.log(conditions);

    const floor = await this.floorRepository.findOne({ where: conditions });
    console.log(floor);

    if (!floor) throw new NotFoundException('Не найден этаж');
    return floor;
  }

  async findAllWithConditions(
    conditions: FindOptionsWhere<FloorEntity>,
  ): Promise<FloorEntity[]> {
    const floor = await this.floorRepository.find({ where: conditions });
    if (!floor) throw new NotFoundException('Не найден этаж');
    return floor;
  }
}
