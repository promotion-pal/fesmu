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
exports.FloorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const floors_service_1 = require("./floors.service");
const floor_dto_1 = require("./dto/floor.dto");
let FloorsController = class FloorsController {
    floorsService;
    constructor(floorsService) {
        this.floorsService = floorsService;
    }
    async findAll() {
        return await this.floorsService.findAll();
    }
    async create(dto) {
        return await this.floorsService.create(dto);
    }
};
exports.FloorsController = FloorsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все этажи',
        description: 'Возвращает список всех этажей в системе',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список этажей успешно получен',
        type: [floor_dto_1.FloorDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Внутренняя ошибка сервера',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FloorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый этаж',
        description: 'Создает новый этаж с указанными параметрами',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Этаж успешно создан',
        type: floor_dto_1.FloorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Неверные входные данные',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Этаж с таким номером уже существует',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [floor_dto_1.FloorDto]),
    __metadata("design:returntype", Promise)
], FloorsController.prototype, "create", null);
exports.FloorsController = FloorsController = __decorate([
    (0, swagger_1.ApiTags)('floors'),
    (0, common_1.Controller)('floors'),
    __metadata("design:paramtypes", [floors_service_1.FloorsService])
], FloorsController);
//# sourceMappingURL=floors.controller.js.map