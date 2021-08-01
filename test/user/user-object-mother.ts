import { UserId } from '../../src/modules/user/domain/user-id';
import { UserName } from '../../src/modules/user/domain/user-name';
import { User } from '../../src/modules/user/domain/user';
import * as faker from 'faker';

export class UserIdMother {
  static create(value?: string): UserId {
    const id = value ? value : faker.datatype.uuid();
    return new UserId(id);
  }
}

export class UserNameMother {
  static create(value?: string): UserName {
    const name = value ? value : faker.name.firstName();
    return new UserName(name);
  }
}

export class UserMother {
  static create(data?: any): User {
    return new User(
      UserIdMother.create(data?.id),
      UserNameMother.create(data?.name),
    );
  }
}
