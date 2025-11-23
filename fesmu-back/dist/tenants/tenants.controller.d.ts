import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    create(createTenantDto: CreateTenantDto): Promise<import("./entities/tenant.entity").TenantEntity>;
    findAll(): Promise<import("./entities/tenant.entity").TenantEntity[]>;
}
