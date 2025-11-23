import { CreateTenantDto } from 'src/tenants/dto/create-tenant.dto';
export declare class CreateDutyDto extends CreateTenantDto {
    date: Date;
    floorNumber: number;
}
