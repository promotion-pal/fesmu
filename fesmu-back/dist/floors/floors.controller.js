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
const floors_service_1 = require("./floors.service");
const create_floor_dto_1 = require("./dto/create-floor.dto");
let FloorsController = class FloorsController {
    floorsService;
    constructor(floorsService) {
        this.floorsService = floorsService;
    }
    async findAll() {
        return await this.floorsService.findAll();
    }
    async create(createFloorDto) {
        return await this.floorsService.create(createFloorDto);
    }
};
exports.FloorsController = FloorsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FloorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_floor_dto_1.CreateFloorDto]),
    __metadata("design:returntype", Promise)
], FloorsController.prototype, "create", null);
exports.FloorsController = FloorsController = __decorate([
    (0, common_1.Controller)('floors'),
    __metadata("design:paramtypes", [floors_service_1.FloorsService])
], FloorsController);
//# sourceMappingURL=floors.controller.js.map