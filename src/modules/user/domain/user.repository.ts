import { User } from './user';
import { UserId } from './user-id';
import { FilterItem } from '../../share/domain/repository';

export abstract class UserRepository {
  abstract persist(user: User): Promise<void>;

  abstract findById(id: UserId): Promise<User | null>;

  abstract findAll(filters: Array<FilterItem>): Promise<User[]>;

  abstract deleteById(id: UserId): Promise<void>;
}
