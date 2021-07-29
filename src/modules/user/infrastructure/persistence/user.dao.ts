import { User } from '../../domain/user';
import { UserName } from '../../domain/user-name';
import { UserId } from '../../domain/user-id';
import { ItemDto } from '../../../share/infrastructure/firestore/item.dto';

export class UserDao {
  id: string;
  name: string;

  static fromAggregate(user: User): UserDao {
    const dao = new UserDao();
    dao.id = user.id.value;
    dao.name = user.name.value;
    return dao;
  }

  static fromItem(item: ItemDto): UserDao {
    const dao = new UserDao();
    dao.id = item.id;
    dao.name = item.data.name;
    return dao;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  toAggregate(): User {
    return new User(new UserId(this.id), new UserName(this.name));
  }
}
