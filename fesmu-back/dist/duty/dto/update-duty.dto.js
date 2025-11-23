"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDutyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_duty_dto_1 = require("./create-duty.dto");
class UpdateDutyDto extends (0, mapped_types_1.PartialType)(create_duty_dto_1.CreateDutyDto) {
}
exports.UpdateDutyDto = UpdateDutyDto;
//# sourceMappingURL=update-duty.dto.js.map