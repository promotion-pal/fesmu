import { Module } from '@nestjs/common';
import { FloorsService } from './floors.service';
import { FloorsController } from './floors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorEntity } from './entities/floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FloorEntity])],
  controllers: [FloorsController],
  providers: [FloorsService],
  exports: [FloorsService],
})
export class FloorsModule {}
