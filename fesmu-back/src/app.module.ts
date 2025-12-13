import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './tenants/tenants.module';
import { FloorsModule } from './floors/floors.module';
import { DutyModule } from './duty/duty.module';
import { VocationsModule } from './vocations/vocations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST', 'localhost'),
        port: configService.getOrThrow<number>('POSTGRES_PORT', 5432),
        username: configService.getOrThrow<string>('POSTGRES_USER', 'root'),
        password: configService.getOrThrow<string>(
          'POSTGRES_PASSWORD',
          'password123',
        ),
        database: configService.getOrThrow<string>('POSTGRES_DB', 'fesmu'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TenantsModule,
    FloorsModule,
    DutyModule,
    VocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
