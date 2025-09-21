import { Module } from '@nestjs/common';
import { DutyService } from './duty.service';
import { DutyController } from './duty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DutyEntity } from './entities/duty.entity';
import { TenantsModule } from 'src/tenants/tenants.module';
import { FloorsModule } from 'src/floors/floors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DutyEntity]),
    TenantsModule,
    FloorsModule,
  ],
  controllers: [DutyController],
  providers: [DutyService],
})
export class DutyModule {}
