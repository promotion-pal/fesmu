import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { CreateTenantDto } from 'src/tenants/dto/create-tenant.dto';

export class CreateDutyDto extends CreateTenantDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  floorNumber: number;
}
