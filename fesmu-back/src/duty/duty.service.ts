import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDutyDto } from './dto/create-duty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DutyEntity } from './entities/duty.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantEntity } from 'src/tenants/entities/tenant.entity';
import { FloorsService } from 'src/floors/floors.service';

@Injectable()
export class DutyService {
  constructor(
    @InjectRepository(DutyEntity)
    private readonly dutyRepository: Repository<DutyEntity>,
    private readonly tenantsService: TenantsService,
    private readonly floorsService: FloorsService,
  ) {}

  async findAll() {
    const duties = await this.dutyRepository.find();

    const dutiesWithRelations = await Promise.all(
      duties.map(async (duty) => {
        const floor = await this.floorsService.findOneWithConditions({
          id: duty.floor_id,
        });
        const tenant = await this.tenantsService.findOneWithConditions({
          id: duty.user_id,
        });

        return {
          ...duty,
          floor,
          tenant,
        };
      }),
    );

    return dutiesWithRelations;
  }

  async getRecorded(floorNumber: number) {
    const floor = await this.floorsService.findOneWithConditions({
      number: floorNumber,
    });

    const duties = await this.findAllWithConditions({ floor_id: floor.id });

    const dutiesWithRelations = await Promise.all(
      duties.map(async (duty) => {
        const floor = await this.floorsService.findOneWithConditions({
          id: duty.floor_id,
        });
        const tenant = await this.tenantsService.findOneWithConditions({
          id: duty.user_id,
        });

        return {
          ...duty,
          floor,
          tenant,
        };
      }),
    );

    return dutiesWithRelations;
  }

  async create(dto: CreateDutyDto) {
    const { date, floorNumber, ...tenantData } = dto;

    let tenant: TenantEntity;
    const existingTenants =
      await this.tenantsService.findOneWithConditions(tenantData);

    if (existingTenants) {
      tenant = existingTenants;
    } else {
      tenant = await this.tenantsService.create(tenantData);
    }

    const floor = await this.floorsService.findOneWithConditions({
      number: floorNumber,
    });

    const duty = this.dutyRepository.create({
      date,
      user_id: tenant.id,
      floor_id: floor.id,
    });

    return await this.dutyRepository.save(duty);
  }

  remove(id: number) {
    return `This action removes a #${id} duty`;
  }

  async findAllWithConditions(
    conditions: FindOptionsWhere<DutyEntity>,
  ): Promise<DutyEntity[]> {
    const duty = await this.dutyRepository.find({ where: conditions });
    console.log(duty);
    if (!duty) throw new NotFoundException('Не удалось найти дежуртво');
    return duty;
  }
}
