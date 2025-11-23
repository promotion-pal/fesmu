import { TenantFaculty } from '../entities/tenant.entity';
export declare class CreateTenantDto {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    room: number;
    group: number;
    faculty: TenantFaculty;
}
