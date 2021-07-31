import { User } from './user';
import { UserId } from './user-id';
import { FilterItem } from '../../share/domain/repository';
import { PaginatorType } from '../../share/domain/paginator.type';
import { OrderType } from '../../share/domain/order.type';

export abstract class UserRepository {
  abstract persist(user: User): Promise<void>;

  abstract findById(id: UserId): Promise<User | null>;

  abstract findAll(
    filters?: Array<FilterItem>,
    paginator?: PaginatorType,
    order?: OrderType,
  ): Promise<User[]>;

  abstract deleteById(id: UserId): Promise<void>;
}
