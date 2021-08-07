import { User } from './user';
import { UserId } from './user-id';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';

export abstract class UserRepository {
  abstract persist(user: User): Promise<void>;

  abstract findById(id: UserId): Promise<User | null>;

  abstract findAll(
    filters?: Array<FilterItem>,
    paginator?: PaginatorTypeImp,
    order?: OrderTypeImp,
  ): Promise<User[]>;

  abstract deleteById(id: UserId): Promise<void>;
}
