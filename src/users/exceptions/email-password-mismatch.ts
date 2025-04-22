export class EmailPasswordMismatchException extends Error {
  constructor() {
    super('Either email or password is incorrect');
  }
}
