import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateDutyDto } from './dto/create-duty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DutyEntity } from './entities/duty.entity';
import { FindOptionsWhere, Repository, Between } from 'typeorm';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantEntity } from 'src/tenants/entities/tenant.entity';
import { FloorsService } from 'src/floors/floors.service';

@Injectable()
export class DutyService {
  constructor(
    @InjectRepository(DutyEntity)
    private readonly dutyRepository: Repository<DutyEntity>,
    private readonly tenantsService: TenantsService,
    private readonly floorsService: FloorsService,
  ) {}

  async findAll() {
    const duties = await this.dutyRepository.find();

    const dutiesWithRelations = await Promise.all(
      duties.map(async (duty) => {
        const floor = await this.floorsService.findOneWithConditions({
          id: duty.floor_id,
        });
        const tenant = await this.tenantsService.findOneWithConditions({
          id: duty.user_id,
        });

        return {
          ...duty,
          floor,
          tenant,
        };
      }),
    );

    return dutiesWithRelations;
  }

  async getRecorded(floorNumber: number) {
    const floor = await this.floorsService.findOneWithConditions({
      number: floorNumber,
    });

    if (!floor) {
      throw new NotFoundException('Этаж не найден');
    }

    const duties = await this.findAllWithConditions({ floor_id: floor.id });

    const dutiesWithRelations = await Promise.all(
      duties.map(async (duty) => {
        const floor = await this.floorsService.findOneWithConditions({
          id: duty.floor_id,
        });
        const tenant = await this.tenantsService.findOneWithConditions({
          id: duty.user_id,
        });

        return {
          ...duty,
          floor,
          tenant,
        };
      }),
    );

    return dutiesWithRelations;
  }

  async create(dto: CreateDutyDto) {
    const { date, floorNumber, ...tenantData } = dto;

    // Проверяем этаж
    const floor = await this.floorsService.findOneWithConditions({
      number: floorNumber,
    });

    if (!floor) {
      throw new NotFoundException('Этаж не найден');
    }

    // Нормализуем телефон для поиска
    const normalizedPhone = this.normalizePhone(tenantData.phone);

    // Ищем существующего жильца по телефону (основной идентификатор)
    let tenant: TenantEntity;
    const existingTenant = await this.tenantsService.findOneWithConditions({
      phone: normalizedPhone,
    });

    if (existingTenant) {
      tenant = existingTenant;

      // Проверяем совпадение данных (чтобы один номер телефона не использовали разные люди)
      await this.validateTenantData(existingTenant, tenantData);

      // Проверка: не записывается ли пользователь на одну и ту же дату
      await this.checkDuplicateDate(tenant.id, date);

      // Проверка: не записывается ли пользователь второй раз в этом месяце
      await this.checkMonthlyLimit(tenant.id, date);
    } else {
      // Проверяем, нет ли другого жильца с такими же ФИО
      await this.checkDuplicateTenant(tenantData);
      
      // Создаем нового жильца с нормализованным телефоном
      tenant = await this.tenantsService.create({
        ...tenantData,
        phone: normalizedPhone,
      });
    }

    // Дополнительная проверка: не занята ли дата на этом этаже
    await this.checkDateAvailability(floor.id, date);

    const duty = this.dutyRepository.create({
      date,
      user_id: tenant.id,
      floor_id: floor.id,
    });

    return await this.dutyRepository.save(duty);
  }

  remove(id: number) {
    return `This action removes a #${id} duty`;
  }

  async findAllWithConditions(
    conditions: FindOptionsWhere<DutyEntity>,
  ): Promise<DutyEntity[]> {
    const duty = await this.dutyRepository.find({ where: conditions });
    if (!duty) throw new NotFoundException('Не удалось найти дежурство');
    return duty;
  }

  /**
   * Нормализация номера телефона
   */
  private normalizePhone(phone: string): string {
    // Убираем все символы, кроме цифр
    const digits = phone.replace(/\D/g, '');
    
    // Если номер начинается с 7 или 8, оставляем 11 цифр
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
      return `+7${digits.slice(1)}`;
    }
    
    // Если номер в международном формате без +
    if (digits.length === 11 && digits.startsWith('7')) {
      return `+7${digits.slice(1)}`;
    }
    
    // Возвращаем оригинальный номер, если он уже в правильном формате
    return phone.startsWith('+7') ? phone : `+7${digits}`;
  }

  /**
   * Проверка данных жильца при использовании существующего телефона
   */
  private async validateTenantData(
    existingTenant: TenantEntity,
    newData: Partial<TenantEntity>,
  ): Promise<void> {
    const mismatches = [];
    
    if (existingTenant.last_name !== newData.last_name) {
      mismatches.push('фамилия');
    }
    if (existingTenant.first_name !== newData.first_name) {
      mismatches.push('имя');
    }
    if (existingTenant.patronymic !== newData.patronymic) {
      mismatches.push('отчество');
    }

    if (mismatches.length > 0) {
      throw new ConflictException(
        `Номер телефона уже используется другим пользователем. Несовпадение в: ${mismatches.join(', ')}`,
      );
    }
  }

  /**
   * Проверка на дублирование жильца
   */
  private async checkDuplicateTenant(tenantData: Partial<TenantEntity>): Promise<void> {
    const existingTenant = await this.tenantsService.findOneWithConditions({
      last_name: tenantData.last_name,
      first_name: tenantData.first_name,
      patronymic: tenantData.patronymic,
    });

    if (existingTenant) {
      throw new ConflictException(
        'Пользователь с такими ФИО уже существует. Используйте ваш номер телефона для записи.',
      );
    }
  }

  /**
   * Проверка на дублирование записи на одну и ту же дату
   */
  private async checkDuplicateDate(userId: number, date: Date): Promise<void> {
    const existingDuty = await this.dutyRepository.findOne({
      where: {
        user_id: userId,
        date: date,
      },
    });

    if (existingDuty) {
      throw new ConflictException('Вы уже записаны на эту дату');
    }
  }

  /**
   * Проверка лимита записей в месяце (не более 1 записи в месяц)
   */
  private async checkMonthlyLimit(userId: number, date: Date): Promise<void> {
    // Получаем начало и конец месяца для указанной даты
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Ищем записи пользователя в этом месяце
    const dutiesThisMonth = await this.dutyRepository.find({
      where: {
        user_id: userId,
        date: Between(startOfMonth, endOfMonth),
      },
    });

    if (dutiesThisMonth.length >= 1) {
      const monthNames = [
        'январе',
        'феврале',
        'марте',
        'апреле',
        'мае',
        'июне',
        'июле',
        'августе',
        'сентябре',
        'октябре',
        'ноябре',
        'декабре',
      ];
      const monthName = monthNames[date.getMonth()];

      throw new ConflictException(
        `Вы уже записаны на дежурство в ${monthName}. Можно записаться только один раз в месяц.`,
      );
    }
  }

  /**
   * Проверка доступности даты на этаже
   */
  private async checkDateAvailability(
    floorId: number,
    date: Date,
  ): Promise<void> {
    const existingDuty = await this.dutyRepository.findOne({
      where: {
        floor_id: floorId,
        date: date,
      },
    });

    if (existingDuty) {
      throw new ConflictException('Эта дата уже занята на данном этаже');
    }
  }

  /**
   * Вспомогательный метод для получения записей пользователя за период
   */
  async getUserDutiesInPeriod(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<DutyEntity[]> {
    return await this.dutyRepository.find({
      where: {
        user_id: userId,
        date: Between(startDate, endDate),
      },
    });
  }
}

// import {
//   Injectable,
//   NotFoundException,
//   ConflictException,
// } from '@nestjs/common';
// import { CreateDutyDto } from './dto/create-duty.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DutyEntity } from './entities/duty.entity';
// import { FindOptionsWhere, Repository, Between } from 'typeorm';
// import { TenantsService } from 'src/tenants/tenants.service';
// import { TenantEntity } from 'src/tenants/entities/tenant.entity';
// import { FloorsService } from 'src/floors/floors.service';

// @Injectable()
// export class DutyService {
//   constructor(
//     @InjectRepository(DutyEntity)
//     private readonly dutyRepository: Repository<DutyEntity>,
//     private readonly tenantsService: TenantsService,
//     private readonly floorsService: FloorsService,
//   ) {}

//   async findAll() {
//     const duties = await this.dutyRepository.find();

//     const dutiesWithRelations = await Promise.all(
//       duties.map(async (duty) => {
//         const floor = await this.floorsService.findOneWithConditions({
//           id: duty.floor_id,
//         });
//         const tenant = await this.tenantsService.findOneWithConditions({
//           id: duty.user_id,
//         });

//         return {
//           ...duty,
//           floor,
//           tenant,
//         };
//       }),
//     );

//     return dutiesWithRelations;
//   }

//   async getRecorded(floorNumber: number) {
//     const floor = await this.floorsService.findOneWithConditions({
//       number: floorNumber,
//     });

//     const duties = await this.findAllWithConditions({ floor_id: floor.id });

//     const dutiesWithRelations = await Promise.all(
//       duties.map(async (duty) => {
//         const floor = await this.floorsService.findOneWithConditions({
//           id: duty.floor_id,
//         });
//         const tenant = await this.tenantsService.findOneWithConditions({
//           id: duty.user_id,
//         });

//         return {
//           ...duty,
//           floor,
//           tenant,
//         };
//       }),
//     );

//     return dutiesWithRelations;
//   }

//   async create(dto: CreateDutyDto) {
//     const { date, floorNumber, ...tenantData } = dto;

//     let tenant: TenantEntity;
//     const existingTenants =
//       await this.tenantsService.findOneWithConditions(tenantData);

//     if (existingTenants) {
//       tenant = existingTenants;

//       // Проверка: не записывается ли пользователь на одну и ту же дату
//       await this.checkDuplicateDate(tenant.id, date);

//       // Проверка: не записывается ли пользователь второй раз в этом месяце
//       await this.checkMonthlyLimit(tenant.id, date);
//     } else {
//       tenant = await this.tenantsService.create(tenantData);
//     }

//     const floor = await this.floorsService.findOneWithConditions({
//       number: floorNumber,
//     });

//     // Дополнительная проверка: не занята ли дата на этом этаже
//     await this.checkDateAvailability(floor.id, date);

//     const duty = this.dutyRepository.create({
//       date,
//       user_id: tenant.id,
//       floor_id: floor.id,
//     });

//     return await this.dutyRepository.save(duty);
//   }

//   remove(id: number) {
//     return `This action removes a #${id} duty`;
//   }

//   async findAllWithConditions(
//     conditions: FindOptionsWhere<DutyEntity>,
//   ): Promise<DutyEntity[]> {
//     const duty = await this.dutyRepository.find({ where: conditions });
//     console.log(duty);
//     if (!duty) throw new NotFoundException('Не удалось найти дежуртво');
//     return duty;
//   }

//   /**
//    * Проверка на дублирование записи на одну и ту же дату
//    */
//   private async checkDuplicateDate(userId: number, date: Date): Promise<void> {
//     const existingDuty = await this.dutyRepository.findOne({
//       where: {
//         user_id: userId,
//         date: date,
//       },
//     });

//     if (existingDuty) {
//       throw new ConflictException('Вы уже записаны на эту дату');
//     }
//   }

//   /**
//    * Проверка лимита записей в месяце (не более 1 записи в месяц)
//    */
//   private async checkMonthlyLimit(userId: number, date: Date): Promise<void> {
//     // Получаем начало и конец месяца для указанной даты
//     const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//     // Ищем записи пользователя в этом месяце
//     const dutiesThisMonth = await this.dutyRepository.find({
//       where: {
//         user_id: userId,
//         date: Between(startOfMonth, endOfMonth),
//       },
//     });

//     if (dutiesThisMonth.length >= 1) {
//       const monthNames = [
//         'январе',
//         'феврале',
//         'марте',
//         'апреле',
//         'мае',
//         'июне',
//         'июле',
//         'августе',
//         'сентябре',
//         'октябре',
//         'ноябре',
//         'декабре',
//       ];
//       const monthName = monthNames[date.getMonth()];

//       throw new ConflictException(
//         `Вы уже записаны на дежурство в ${monthName}. Можно записаться только один раз в месяц.`,
//       );
//     }
//   }

//   /**
//    * Проверка доступности даты на этаже
//    */
//   private async checkDateAvailability(
//     floorId: number,
//     date: Date,
//   ): Promise<void> {
//     const existingDuty = await this.dutyRepository.findOne({
//       where: {
//         floor_id: floorId,
//         date: date,
//       },
//     });

//     if (existingDuty) {
//       throw new ConflictException('Эта дата уже занята на данном этаже');
//     }
//   }

//   /**
//    * Вспомогательный метод для получения записей пользователя за период
//    */
//   async getUserDutiesInPeriod(
//     userId: number,
//     startDate: Date,
//     endDate: Date,
//   ): Promise<DutyEntity[]> {
//     return await this.dutyRepository.find({
//       where: {
//         user_id: userId,
//         date: Between(startDate, endDate),
//       },
//     });
//   }
// }

// // import { Injectable, NotFoundException } from '@nestjs/common';
// // import { CreateDutyDto } from './dto/create-duty.dto';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { DutyEntity } from './entities/duty.entity';
// // import { FindOptionsWhere, Repository } from 'typeorm';
// // import { TenantsService } from 'src/tenants/tenants.service';
// // import { TenantEntity } from 'src/tenants/entities/tenant.entity';
// // import { FloorsService } from 'src/floors/floors.service';

// // @Injectable()
// // export class DutyService {
// //   constructor(
// //     @InjectRepository(DutyEntity)
// //     private readonly dutyRepository: Repository<DutyEntity>,
// //     private readonly tenantsService: TenantsService,
// //     private readonly floorsService: FloorsService,
// //   ) {}

// //   async findAll() {
// //     const duties = await this.dutyRepository.find();

// //     const dutiesWithRelations = await Promise.all(
// //       duties.map(async (duty) => {
// //         const floor = await this.floorsService.findOneWithConditions({
// //           id: duty.floor_id,
// //         });
// //         const tenant = await this.tenantsService.findOneWithConditions({
// //           id: duty.user_id,
// //         });

// //         return {
// //           ...duty,
// //           floor,
// //           tenant,
// //         };
// //       }),
// //     );

// //     return dutiesWithRelations;
// //   }

// //   async getRecorded(floorNumber: number) {
// //     const floor = await this.floorsService.findOneWithConditions({
// //       number: floorNumber,
// //     });

// //     const duties = await this.findAllWithConditions({ floor_id: floor.id });

// //     const dutiesWithRelations = await Promise.all(
// //       duties.map(async (duty) => {
// //         const floor = await this.floorsService.findOneWithConditions({
// //           id: duty.floor_id,
// //         });
// //         const tenant = await this.tenantsService.findOneWithConditions({
// //           id: duty.user_id,
// //         });

// //         return {
// //           ...duty,
// //           floor,
// //           tenant,
// //         };
// //       }),
// //     );

// //     return dutiesWithRelations;
// //   }

// //   async create(dto: CreateDutyDto) {
// //     const { date, floorNumber, ...tenantData } = dto;

// //     let tenant: TenantEntity;
// //     const existingTenants =
// //       await this.tenantsService.findOneWithConditions(tenantData);

// //     if (existingTenants) {
// //       tenant = existingTenants;
// //     } else {
// //       tenant = await this.tenantsService.create(tenantData);
// //     }

// //     const floor = await this.floorsService.findOneWithConditions({
// //       number: floorNumber,
// //     });

// //     const duty = this.dutyRepository.create({
// //       date,
// //       user_id: tenant.id,
// //       floor_id: floor.id,
// //     });

// //     return await this.dutyRepository.save(duty);
// //   }

// //   remove(id: number) {
// //     return `This action removes a #${id} duty`;
// //   }

// //   async findAllWithConditions(
// //     conditions: FindOptionsWhere<DutyEntity>,
// //   ): Promise<DutyEntity[]> {
// //     const duty = await this.dutyRepository.find({ where: conditions });
// //     console.log(duty);
// //     if (!duty) throw new NotFoundException('Не удалось найти дежуртво');
// //     return duty;
// //   }
// // }
