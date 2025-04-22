import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigurationModule } from './core/configuration/configuration.module';
import { ConfigurationService } from './core/configuration/configuration.service';
import { AuthGuardProvider } from './core/guards/auth.guard-factory';
import { LoggerModule } from './core/logger/logger.module';
import { TodosModule } from './todos/todo.module';
import { I_USER_REPOSITORY } from './users/ports/user-repository.interface';
import { Authenticator } from './users/services/authenticator';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        uri: configService.database().url,
      }),
    }),
    LoggerModule,
    UsersModule,
    TodosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: Authenticator,
      inject: [I_USER_REPOSITORY],
      useFactory: (repository) => {
        return new Authenticator(repository);
      },
    },
    AuthGuardProvider,
  ],
})
export class AppModule {}
