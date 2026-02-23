"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const app_1 = require("./app");
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle(app_1.appConfig.name)
    .setDescription('API документация')
    .setVersion('1.0')
    .addTag('app', 'Базовые операции')
    .addBasicAuth()
    .build();
exports.swaggerConfig = swaggerConfig;
//# sourceMappingURL=swagger.js.map