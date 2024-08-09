export class TodoNotFoundException extends Error {
  constructor() {
    super('The todo is not found');
  }
}
