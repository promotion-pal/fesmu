import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async findAll() {
    return await this.tenantRepository.find();
  }

  async create(dto: CreateTenantDto) {
    const tenant = await this.findOneWithConditions(dto);

    if (tenant) {
      throw new ConflictException('Такой жилец уже существует');
    }

    const newTenant = this.tenantRepository.create(dto);
    return await this.tenantRepository.save(newTenant);
  }

  async findOneWithConditions(
    conditions: FindOptionsWhere<TenantEntity>,
  ): Promise<TenantEntity | null> {
    return await this.tenantRepository.findOne({ where: conditions });
  }

  async findAllWithConditions(
    conditions: FindOptionsWhere<TenantEntity>,
  ): Promise<TenantEntity[]> {
    return await this.tenantRepository.find({ where: conditions });
  }
}
