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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantEntity = exports.TenantFaculty = void 0;
const typeorm_1 = require("typeorm");
var TenantFaculty;
(function (TenantFaculty) {
    TenantFaculty["PEDIATRIC"] = "pediatric";
    TenantFaculty["MEDICAL"] = "medical";
    TenantFaculty["DENTAL"] = "dental";
    TenantFaculty["PHARMACEUTICAL"] = "pharmaceutical";
})(TenantFaculty || (exports.TenantFaculty = TenantFaculty = {}));
let TenantEntity = class TenantEntity {
    id;
    first_name;
    last_name;
    patronymic;
    phone;
    room;
    group;
    faculty;
};
exports.TenantEntity = TenantEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TenantEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TenantEntity.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TenantEntity.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TenantEntity.prototype, "patronymic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TenantEntity.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TenantEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TenantFaculty,
        default: TenantFaculty.PEDIATRIC,
    }),
    __metadata("design:type", String)
], TenantEntity.prototype, "faculty", void 0);
exports.TenantEntity = TenantEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'tenants' })
], TenantEntity);
//# sourceMappingURL=tenant.entity.js.map