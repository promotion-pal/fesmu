import { DutyService } from './duty.service';
import { CreateDutyDto } from './dto/create-duty.dto';
export declare class DutyController {
    private readonly dutyService;
    constructor(dutyService: DutyService);
    create(createDutyDto: CreateDutyDto): Promise<import("./entities/duty.entity").DutyEntity>;
    findAll(): Promise<{
        floor: import("../floors/entities/floor.entity").FloorEntity;
        tenant: import("../tenants/entities/tenant.entity").TenantEntity | null;
        id: number;
        date: Date;
        user_id: number;
        floor_id: number;
    }[]>;
    getRecorded(id: string): Promise<{
        floor: import("../floors/entities/floor.entity").FloorEntity;
        tenant: import("../tenants/entities/tenant.entity").TenantEntity | null;
        id: number;
        date: Date;
        user_id: number;
        floor_id: number;
    }[]>;
    remove(id: string): string;
}
