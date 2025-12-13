import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVocationDto {
  @IsNumber()
  @Type(() => Number)
  floorNumber: number;

  @IsString()
  @MinLength(1, { message: 'Имя не может быть пустым' })
  firstName: string;

  @IsString()
  @MinLength(1, { message: 'Фамилия не может быть пустой' })
  lastName: string;

  @IsString()
  @IsOptional()
  patronymic?: string;

  @IsString()
  room: string;

  @IsDate()
  @Type(() => Date)
  arrivalDate: Date;

  @IsDate()
  @Type(() => Date)
  departureDate: Date;
}
