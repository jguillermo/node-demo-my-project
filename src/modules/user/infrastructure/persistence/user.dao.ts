import { Collection } from 'fireorm';
import { User } from '../../domain/user';
import { UserName } from '../../domain/user-name';
import { UserId } from '../../domain/user-id';

@Collection('users')
export class UserDao {
  id: string;
  name: string;

  static create(user: User): UserDao {
    const dao = new UserDao();
    dao.id = user.id.value;
    dao.name = user.name.value;
    return dao;
  }

  toDomain(): User {
    return new User(new UserId(this.id), new UserName(this.name));
  }
}
