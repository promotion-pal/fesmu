import { Module } from '@nestjs/common';
import { VocationsService } from './vocations.service';
import { VocationsController } from './vocations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VocationEntity } from './entities/vocations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VocationEntity])],
  controllers: [VocationsController],
  providers: [VocationsService],
})
export class VocationsModule {}
