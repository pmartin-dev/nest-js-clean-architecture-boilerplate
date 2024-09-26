import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  database() {
    return {
      url: this.configService.get<string>('DATABASE_URL'),
      testUrl: this.configService.get<string>('DATABASE_INT_TEST_URL'),
    };
  }

  server() {
    return {
      port: this.configService.get<number>('PORT'),
    };
  }

  logger() {
    return {
      level: this.configService.get<string>('LOGGER_LEVEL'),
    };
  }
}
