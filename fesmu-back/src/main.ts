import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('NEST_PORT');
  const ADMIN_URL = configService.getOrThrow<number>('ADMIN_URL');
  const SITE_URL = configService.getOrThrow<number>('SITE_URL');

  app.enableCors({
    origin: [ADMIN_URL, SITE_URL],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
}
bootstrap();
