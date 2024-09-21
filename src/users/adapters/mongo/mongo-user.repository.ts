import { Model } from 'mongoose';

import { User } from '../../../users/entities/user.entity';
import { IUserRepository } from '../../../users/ports/user-repository.interface';
import { MongoUser } from './mongo-user';

export class MongoUserRepository implements IUserRepository {
  constructor(private readonly model: Model<MongoUser.SchemaClass>) {}

  async findAll(): Promise<User[]> {
    const users = await this.model.find().exec();
    return users.map(
      (user) =>
        new User({ id: user._id, email: user.email, password: user.password }),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email });

    if (!user) {
      return null;
    }

    return new User({
      id: user._id,
      email: user.email,
      password: user.password, // TODO: remove this
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.model.findOne({ _id: id });

    if (!user) {
      return null;
    }

    return new User({
      id: user._id,
      email: user.email,
      password: user.password, // TODO: remove this
    });
  }

  async create(user: User): Promise<void> {
    const record = new this.model({
      _id: user.props.id,
      email: user.props.email,
      password: user.props.password,
    });
    await record.save();
  }
}
