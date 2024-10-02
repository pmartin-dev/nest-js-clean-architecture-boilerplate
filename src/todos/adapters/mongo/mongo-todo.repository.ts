import * as deepObjectDiff from 'deep-object-diff';
import { Model } from 'mongoose';

import { Todo } from '../../../todos/entities/todo.entity';
import { ITodoRepository } from '../../../todos/ports/todo-repository.interface';
import { MongoTodo } from './mongo-todo';

export class MongoTodoRepository implements ITodoRepository {
  constructor(private readonly model: Model<MongoTodo.SchemaClass>) {}

  async findAll(): Promise<Todo[]> {
    // TODO: will need to check if the user is authorized to see the todos
    const records = await this.model.find().exec();
    return records.map(
      (record) =>
        new Todo({
          id: record._id,
          title: record.title,
          userId: record.userId,
        }),
    );
  }

  async findById({ todoId, userId }): Promise<Todo | null> {
    console.log({ todoId, userId });
    const record = await this.model.findOne({ _id: todoId, userId });

    const records = await this.model.find({ _id: todoId });
    console.log(records);

    if (!record) {
      return null;
    }

    return new Todo({ id: record._id, title: record.title, userId });
  }

  async create(todo: Todo): Promise<void> {
    const record = new this.model({
      _id: todo.props.id,
      title: todo.props.title,
      userId: todo.props.userId,
    });
    await record.save();
  }

  async update(todo: Todo): Promise<void> {
    const record = await this.model.findOne({
      _id: todo.props.id,
      userId: todo.props.userId,
    });

    if (!record) {
      return;
    }

    const diff = deepObjectDiff.diff(record, todo.props);

    if (Object.keys(diff).length === 0) {
      return;
    }

    await record.updateOne(diff);
  }

  async delete({ todoId, userId }): Promise<void> {
    await this.model.deleteOne({ _id: todoId, userId });
  }
}
