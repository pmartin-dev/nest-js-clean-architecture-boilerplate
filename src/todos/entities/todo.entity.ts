import { Entity } from '../../shared/entity';

interface ITodo {
  id: string;
  title: string;
  userId: string;
}

export class Todo extends Entity<ITodo> {
  hasTooLongTitle() {
    return this.props.title.length > 100;
  }
}
