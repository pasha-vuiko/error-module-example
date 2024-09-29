import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PinoLogger } from '@shared/modules/logger/loggers/pino-logger.service';
import { setupExceptionFilters, setupOpenApi } from '@shared/bootstrap/bootstrap-plugins';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  setupOpenApi(app);
  setupExceptionFilters(app);

  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  await app.listen(3000, '0.0.0.0');

  const appUrl = await app.getUrl();

  logger.log(`App is running on: ${appUrl}`, 'main.ts');
}

void bootstrap();
