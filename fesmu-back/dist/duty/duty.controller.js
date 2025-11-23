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
exports.DutyController = void 0;
const common_1 = require("@nestjs/common");
const duty_service_1 = require("./duty.service");
const create_duty_dto_1 = require("./dto/create-duty.dto");
let DutyController = class DutyController {
    dutyService;
    constructor(dutyService) {
        this.dutyService = dutyService;
    }
    create(createDutyDto) {
        return this.dutyService.create(createDutyDto);
    }
    findAll() {
        return this.dutyService.findAll();
    }
    getRecorded(id) {
        return this.dutyService.getRecorded(+id);
    }
    remove(id) {
        return this.dutyService.remove(+id);
    }
};
exports.DutyController = DutyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_duty_dto_1.CreateDutyDto]),
    __metadata("design:returntype", void 0)
], DutyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DutyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('recorded/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DutyController.prototype, "getRecorded", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DutyController.prototype, "remove", null);
exports.DutyController = DutyController = __decorate([
    (0, common_1.Controller)('duty'),
    __metadata("design:paramtypes", [duty_service_1.DutyService])
], DutyController);
//# sourceMappingURL=duty.controller.js.map