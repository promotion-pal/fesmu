"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocationsModule = void 0;
const common_1 = require("@nestjs/common");
const vocations_service_1 = require("./vocations.service");
const vocations_controller_1 = require("./vocations.controller");
const typeorm_1 = require("@nestjs/typeorm");
const vocations_entity_1 = require("./entities/vocations.entity");
let VocationsModule = class VocationsModule {
};
exports.VocationsModule = VocationsModule;
exports.VocationsModule = VocationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vocations_entity_1.VocationEntity])],
        controllers: [vocations_controller_1.VocationsController],
        providers: [vocations_service_1.VocationsService],
    })
], VocationsModule);
//# sourceMappingURL=vocations.module.js.map