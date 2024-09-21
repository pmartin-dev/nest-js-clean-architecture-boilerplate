import * as deepObjectDiff from 'deep-object-diff';
import { Model } from 'mongoose';

import { Todo } from '../../../todos/entities/todo.entity';
import { ITodoRepository } from '../../../todos/ports/todo-repository.interface';
import { MongoTodo } from './mongo-todo';

export class MongoTodoRepository implements ITodoRepository {
  constructor(private readonly model: Model<MongoTodo.SchemaClass>) {}

  async findAll(): Promise<Todo[]> {
    const records = await this.model.find().exec();
    return records.map(
      (record) => new Todo({ id: record._id, title: record.title }),
    );
  }

  async findById(id: string): Promise<Todo | null> {
    const record = await this.model.findOne({ _id: id });

    if (!record) {
      return null;
    }

    return new Todo({ id: record._id, title: record.title });
  }

  async create(todo: Todo): Promise<void> {
    try {
      const record = new this.model({
        _id: todo.props.id,
        title: todo.props.title,
      });
      await record.save();
    } catch (e) {
      console.log({ e }); // ERROR: PoolClosedError [MongoPoolClosedError]: Attempted to check out a connection from closed connection pool
    }
  }

  async update(todo: Todo): Promise<void> {
    const record = await this.model.findOne({ _id: todo.props.id });

    if (!record) {
      return;
    }

    const diff = deepObjectDiff.diff(record, todo.props);

    if (Object.keys(diff).length === 0) {
      return;
    }

    await record.updateOne(diff);
  }

  async delete(todo: Todo): Promise<void> {
    await this.model.deleteOne({ _id: todo.props.id });
  }
}
