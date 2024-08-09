import { v4 } from 'uuid';
import { IIDGenerator } from '../ports/id-generator.interface';

export class RandomIdGenerator implements IIDGenerator {
  generate(): string {
    return v4();
  }
}
