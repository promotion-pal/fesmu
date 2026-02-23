import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FloorDto {
  @ApiProperty({
    description: 'ФИО или идентификатор старосты этажа',
    example: 'Иванов Иван Иванович',
    type: String,
    required: true,
  })
  @IsString()
  elder: string;

  @ApiProperty({
    description: 'Номер этажа',
    example: 5,
    type: Number,
    minimum: 1,
    maximum: 100,
    required: true,
  })
  @IsNumber()
  number: number;
}
