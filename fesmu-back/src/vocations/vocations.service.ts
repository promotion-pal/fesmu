import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VocationEntity } from './entities/vocations.entity';
import { Repository } from 'typeorm';
import { CreateVocationDto } from './dto/create-vocations.dto';

@Injectable()
export class VocationsService {
  constructor(
    @InjectRepository(VocationEntity)
    private readonly vocationRepository: Repository<VocationEntity>,
  ) {}

  async get() {
    return await this.vocationRepository.find();
  }

  async create(dto: CreateVocationDto) {
    const vocation = this.vocationRepository.create(dto);
    return await this.vocationRepository.save(vocation);
  }
}
