import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
export declare class TenantsService {
    private readonly tenantRepository;
    constructor(tenantRepository: Repository<TenantEntity>);
    findAll(): Promise<TenantEntity[]>;
    create(dto: CreateTenantDto): Promise<TenantEntity>;
    findOneWithConditions(conditions: FindOptionsWhere<TenantEntity>): Promise<TenantEntity | null>;
    findAllWithConditions(conditions: FindOptionsWhere<TenantEntity>): Promise<TenantEntity[]>;
}
