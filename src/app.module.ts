import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard } from './core/guards/auth.guard';
import { TodosModule } from './todos/todos.module';
import { I_USER_REPOSITORY } from './users/ports/user-repository.interface';
import { Authenticator } from './users/services/authenticator';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Temps d'attente pour la sélection du serveur
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
