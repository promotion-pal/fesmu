import { DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from './app';

const swaggerConfig = new DocumentBuilder()
  .setTitle(appConfig.name)
  .setDescription('API документация')
  .setVersion('1.0')
  .addTag('app', 'Базовые операции')
  .addBasicAuth()
  .build();

export { swaggerConfig };
