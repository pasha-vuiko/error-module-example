import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { PinoLogger } from '@shared/modules/logger/loggers/pino-logger.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
    bufferLogs: true,
  });

  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  await app.listen(3000, '0.0.0.0');

  const appUrl = await app.getUrl();

  logger.log(`App is running on: ${appUrl}`, 'main.ts');
}

void bootstrap();
