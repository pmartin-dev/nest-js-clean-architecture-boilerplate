import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ConfigurationService } from './configuration.service';
import { validateConfiguration } from './validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateConfiguration,
    }),
  ],
  providers: [
    {
      provide: ConfigurationService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new ConfigurationService(configService);
      },
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
