import { IsNumber, IsString } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  elder: string;

  @IsNumber()
  number: number;
}
