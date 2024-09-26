import type { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

import { isProductionEnvironnement } from '@/shared/environment';

import type { ConfigurationService } from '../configuration/configuration.service';

export class WinstonLoggerService implements LoggerService {
  private logger: Logger;

  constructor(private readonly configurationService: ConfigurationService) {
    this.logger = createLogger({
      level: configurationService.logger().level,
      ...configurationService.logger(),
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: isProductionEnvironnement() ? PROD_FORMAT : DEV_FORMAT,
        }),
      ],
    });
  }

  debug(message: string, ...optionalParams: string[]): Logger {
    return this.logger.debug(message, {
      context: optionalParams,
    });
  }

  log(message: string, ...optionalParams: string[]): Logger {
    return this.logger.info(message, {
      context: optionalParams,
    });
  }

  error(message: string, ...optionalParams: string[]): Logger {
    return this.logger.error(message, {
      context: optionalParams,
    });
  }

  warn(message: string, ...optionalParams: string[]): Logger {
    return this.logger.warn(message, {
      context: optionalParams,
    });
  }
}

const DEV_FORMAT = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.colorize({
    colors: {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
    },
  }),
  format.printf((info) => {
    return `[${info.level}] ${info.message}`;
  }),
  format.align(),
);

const PROD_FORMAT = format.combine(
  format.printf(({ level, message }) => {
    return `[${level}] ${message}`;
  }),
);
