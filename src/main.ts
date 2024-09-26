import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigurationService } from './core/configuration/configuration.service';
import { WinstonLoggerService } from './core/logger/winston-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(WinstonLoggerService);
  app.useLogger(loggerService);

  const configService = app.get(ConfigurationService);
  const port = configService.server().port;

  await app.listen(port);
  loggerService.log(
    `🚀 Application started on ${process.env['NODE_ENV'] ?? 'local'} port ${port}`,
  );
}
bootstrap();
