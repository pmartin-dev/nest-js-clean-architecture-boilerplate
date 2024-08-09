import { IDateGenerator } from '../ports/date-generator.interface';

export class CurrentDateGenerator implements IDateGenerator {
  generate(): Date {
    return new Date();
  }
}
