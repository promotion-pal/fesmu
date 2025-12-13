import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = 4000;
  const ADMIN_URL = configService.getOrThrow<string>(
    'BACK_ADMIN_URL',
    'http://localhost:4173',
  );
  const SITE_URL = configService.getOrThrow<string>(
    'BACK_SITE_URL',
    'http://localhost:3000',
  );

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
  console.log(SITE_URL);
}
bootstrap();
