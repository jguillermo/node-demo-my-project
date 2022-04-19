import { User } from '../../../domain/user';
import { UserId } from '../../../domain/user-id';
import { UserName } from '../../../domain/user-name';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserDao {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  static fromAggregate(user: User): UserDao {
    const dao = new UserDao();
    dao.id = user.id.value;
    dao.name = user.name.value;
    return dao;
  }

  toAggregate(): User {
    return new User(new UserId(this.id), new UserName(this.name));
  }
}
