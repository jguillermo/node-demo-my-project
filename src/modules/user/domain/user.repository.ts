import { User } from './user';
import { UserId } from './user-id';

export abstract class UserRepository {
  abstract persist(user: User): Promise<void>;

  abstract findById(id: UserId): Promise<User | null>;

  abstract findAll(filters: any): Promise<User[]>;

  abstract deleteById(id: UserId): Promise<void>;
}
