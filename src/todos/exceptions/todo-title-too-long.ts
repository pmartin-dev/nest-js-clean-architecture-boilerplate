export class TodoTitleTooLongException extends Error {
  constructor() {
    super('The title is too long');
  }
}
