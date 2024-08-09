import { Entity } from '../../shared/entity';

interface IUser {
  id: string;
  email: string;
  password: string;
}

export class User extends Entity<IUser> {}
