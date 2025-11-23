"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DutyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const duty_entity_1 = require("./entities/duty.entity");
const typeorm_2 = require("typeorm");
const tenants_service_1 = require("../tenants/tenants.service");
const floors_service_1 = require("../floors/floors.service");
let DutyService = class DutyService {
    dutyRepository;
    tenantsService;
    floorsService;
    constructor(dutyRepository, tenantsService, floorsService) {
        this.dutyRepository = dutyRepository;
        this.tenantsService = tenantsService;
        this.floorsService = floorsService;
    }
    async findAll() {
        const duties = await this.dutyRepository.find();
        const dutiesWithRelations = await Promise.all(duties.map(async (duty) => {
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
        }));
        return dutiesWithRelations;
    }
    async getRecorded(floorNumber) {
        const floor = await this.floorsService.findOneWithConditions({
            number: floorNumber,
        });
        const duties = await this.findAllWithConditions({ floor_id: floor.id });
        const dutiesWithRelations = await Promise.all(duties.map(async (duty) => {
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
        }));
        return dutiesWithRelations;
    }
    async create(dto) {
        const { date, floorNumber, ...tenantData } = dto;
        let tenant;
        const existingTenants = await this.tenantsService.findOneWithConditions(tenantData);
        if (existingTenants) {
            tenant = existingTenants;
            await this.checkDuplicateDate(tenant.id, date);
            await this.checkMonthlyLimit(tenant.id, date);
        }
        else {
            tenant = await this.tenantsService.create(tenantData);
        }
        const floor = await this.floorsService.findOneWithConditions({
            number: floorNumber,
        });
        await this.checkDateAvailability(floor.id, date);
        const duty = this.dutyRepository.create({
            date,
            user_id: tenant.id,
            floor_id: floor.id,
        });
        return await this.dutyRepository.save(duty);
    }
    remove(id) {
        return `This action removes a #${id} duty`;
    }
    async findAllWithConditions(conditions) {
        const duty = await this.dutyRepository.find({ where: conditions });
        console.log(duty);
        if (!duty)
            throw new common_1.NotFoundException('Не удалось найти дежуртво');
        return duty;
    }
    async checkDuplicateDate(userId, date) {
        const existingDuty = await this.dutyRepository.findOne({
            where: {
                user_id: userId,
                date: date,
            },
        });
        if (existingDuty) {
            throw new common_1.ConflictException('Вы уже записаны на эту дату');
        }
    }
    async checkMonthlyLimit(userId, date) {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const dutiesThisMonth = await this.dutyRepository.find({
            where: {
                user_id: userId,
                date: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
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
            throw new common_1.ConflictException(`Вы уже записаны на дежурство в ${monthName}. Можно записаться только один раз в месяц.`);
        }
    }
    async checkDateAvailability(floorId, date) {
        const existingDuty = await this.dutyRepository.findOne({
            where: {
                floor_id: floorId,
                date: date,
            },
        });
        if (existingDuty) {
            throw new common_1.ConflictException('Эта дата уже занята на данном этаже');
        }
    }
    async getUserDutiesInPeriod(userId, startDate, endDate) {
        return await this.dutyRepository.find({
            where: {
                user_id: userId,
                date: (0, typeorm_2.Between)(startDate, endDate),
            },
        });
    }
};
exports.DutyService = DutyService;
exports.DutyService = DutyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(duty_entity_1.DutyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tenants_service_1.TenantsService,
        floors_service_1.FloorsService])
], DutyService);
//# sourceMappingURL=duty.service.js.map