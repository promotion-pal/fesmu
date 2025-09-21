import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
