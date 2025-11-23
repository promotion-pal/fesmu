import { CreateDutyDto } from './dto/create-duty.dto';
import { DutyEntity } from './entities/duty.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantEntity } from 'src/tenants/entities/tenant.entity';
import { FloorsService } from 'src/floors/floors.service';
export declare class DutyService {
    private readonly dutyRepository;
    private readonly tenantsService;
    private readonly floorsService;
    constructor(dutyRepository: Repository<DutyEntity>, tenantsService: TenantsService, floorsService: FloorsService);
    findAll(): Promise<{
        floor: import("../floors/entities/floor.entity").FloorEntity;
        tenant: TenantEntity | null;
        id: number;
        date: Date;
        user_id: number;
        floor_id: number;
    }[]>;
    getRecorded(floorNumber: number): Promise<{
        floor: import("../floors/entities/floor.entity").FloorEntity;
        tenant: TenantEntity | null;
        id: number;
        date: Date;
        user_id: number;
        floor_id: number;
    }[]>;
    create(dto: CreateDutyDto): Promise<DutyEntity>;
    remove(id: number): string;
    findAllWithConditions(conditions: FindOptionsWhere<DutyEntity>): Promise<DutyEntity[]>;
    private checkDuplicateDate;
    private checkMonthlyLimit;
    private checkDateAvailability;
    getUserDutiesInPeriod(userId: number, startDate: Date, endDate: Date): Promise<DutyEntity[]>;
}
