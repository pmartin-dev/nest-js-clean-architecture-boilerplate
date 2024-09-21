import {
  Prop,
  Schema as MongooseSchema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MongoTodo {
  export const CollectionName = 'todos';

  @MongooseSchema({ collection: CollectionName })
  export class SchemaClass {
    @Prop({ type: String })
    _id: string;

    @Prop()
    title: string;
  }

  export const Schema = SchemaFactory.createForClass(SchemaClass);
  export type Document = HydratedDocument<SchemaClass>;
}
