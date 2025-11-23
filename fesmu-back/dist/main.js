"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const PORT = 4000;
    const ADMIN_URL = configService.getOrThrow('ADMIN_URL', 'http://localhost:3000');
    const SITE_URL = configService.getOrThrow('SITE_URL', 'http://localhost:3000');
    app.enableCors({
        origin: [ADMIN_URL, SITE_URL],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map