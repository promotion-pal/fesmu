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
exports.VocationEntity = void 0;
const typeorm_1 = require("typeorm");
let VocationEntity = class VocationEntity {
    id;
    floorNumber;
    firstName;
    lastName;
    patronymic;
    room;
    arrivalDate;
    departureDate;
    createdAt;
};
exports.VocationEntity = VocationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VocationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'floor_number' }),
    __metadata("design:type", Number)
], VocationEntity.prototype, "floorNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], VocationEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], VocationEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VocationEntity.prototype, "patronymic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VocationEntity.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arrival_date' }),
    __metadata("design:type", Date)
], VocationEntity.prototype, "arrivalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'departure_date' }),
    __metadata("design:type", Date)
], VocationEntity.prototype, "departureDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], VocationEntity.prototype, "createdAt", void 0);
exports.VocationEntity = VocationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'vocations' })
], VocationEntity);
//# sourceMappingURL=vocations.entity.js.map