import { Module } from '@nestjs/common';

import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { WinstonLoggerService } from './winston-logger.service';

@Module({
  imports: [ConfigurationModule],
  providers: [
    {
      provide: WinstonLoggerService,
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) =>
        new WinstonLoggerService(configurationService),
    },
  ],
  exports: [WinstonLoggerService],
})
export class LoggerModule {}
