"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorUpdateDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_floor_dto_1 = require("./create-floor.dto");
class FloorUpdateDto extends (0, mapped_types_1.PartialType)(create_floor_dto_1.FloorCreateDto) {
}
exports.FloorUpdateDto = FloorUpdateDto;
//# sourceMappingURL=update-floor.dto.js.map