"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DutyModule = void 0;
const common_1 = require("@nestjs/common");
const duty_service_1 = require("./duty.service");
const duty_controller_1 = require("./duty.controller");
const typeorm_1 = require("@nestjs/typeorm");
const duty_entity_1 = require("./entities/duty.entity");
const tenants_module_1 = require("../tenants/tenants.module");
const floors_module_1 = require("../floors/floors.module");
let DutyModule = class DutyModule {
};
exports.DutyModule = DutyModule;
exports.DutyModule = DutyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([duty_entity_1.DutyEntity]),
            tenants_module_1.TenantsModule,
            floors_module_1.FloorsModule,
        ],
        controllers: [duty_controller_1.DutyController],
        providers: [duty_service_1.DutyService],
    })
], DutyModule);
//# sourceMappingURL=duty.module.js.map