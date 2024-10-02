import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import { RandomIdGenerator } from '../core/adapters/random-id-generator';
import { I_ID_GENERATOR } from '../core/ports/id-generator.interface';
import { MongoUser } from './adapters/mongo/mongo-user';
import { MongoUserRepository } from './adapters/mongo/mongo-user.repository';
import { UserController } from './controllers/user.controller';
import { I_USER_REPOSITORY } from './ports/user-repository.interface';
import { CreateUser } from './use-cases/create-user';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoUser.CollectionName,
        schema: MongoUser.Schema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: I_USER_REPOSITORY,
      inject: [getModelToken(MongoUser.CollectionName)],
      useFactory: (model) => {
        return new MongoUserRepository(model);
      },
    },
    {
      provide: I_ID_GENERATOR,
      useClass: RandomIdGenerator,
    },
    {
      provide: CreateUser,
      inject: [I_USER_REPOSITORY, I_ID_GENERATOR],
      useFactory: (repository, idGenerator) => {
        return new CreateUser(repository, idGenerator);
      },
    },
  ],
  exports: [I_USER_REPOSITORY],
})
export class UsersModule {}
