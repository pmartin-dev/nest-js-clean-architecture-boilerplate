import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigurationModule } from './core/configuration/configuration.module';
import { ConfigurationService } from './core/configuration/configuration.service';
import { AuthGuard } from './core/guards/auth.guard';
import { TodosModule } from './todos/todos.module';
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
    {
      provide: APP_GUARD,
      inject: [Authenticator],
      useFactory: (authenticator) => {
        return new AuthGuard(authenticator);
      },
    },
  ],
})
export class AppModule {}
