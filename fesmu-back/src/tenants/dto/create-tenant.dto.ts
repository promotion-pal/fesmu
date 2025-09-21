import { IsEnum, IsString, IsNumber } from 'class-validator';
import { TenantFaculty } from '../entities/tenant.entity';

export class CreateTenantDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  patronymic: string;

  @IsString()
  phone: string;

  @IsNumber()
  room: number;

  @IsNumber()
  group: number;

  @IsEnum(TenantFaculty, { message: 'Неверный факультет' })
  faculty: TenantFaculty;
}
