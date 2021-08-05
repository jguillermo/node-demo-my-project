import { UserId } from './user-id';
import { UserName } from './user-name';
import { UserCreatedEvent } from './user-created.event';
import { AggregateRoot } from '../../share/domain/aggregate-root';
import { UserUpdatedEvent } from './user-updated.event';

export class User extends AggregateRoot {
  constructor(private _id: UserId, private _name: UserName) {
    super();
  }

  static create(id: UserId, name: UserName): User {
    const user = new User(id, name);
    user.record(new UserCreatedEvent(id.value, name.value));
    return user;
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName {
    return this._name;
  }

  change(name: UserName): void {
    this._name = name;
    this.record(new UserUpdatedEvent(this.id.value, this.name.value));
  }
}
