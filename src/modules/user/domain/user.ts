import { UserId } from './user-id';
import { UserName } from './user-name';

export class User {
  constructor(private _id: UserId, private _name: UserName) {}

  static create(id: UserId, name: UserName) {
    return new User(id, name);
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName {
    return this._name;
  }
}
