import { User } from './user';
import { UserId } from './user-id';

export interface UserRepository {
  save(user: User);

  findById(id: UserId): Promise<User | null>;

  findAll(): Promise<User[]>;

  deleteById(id: UserId): Promise<void>;
}
