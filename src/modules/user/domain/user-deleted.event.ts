import { EventBase } from 'base-ddd';

export class UserDeletedEvent extends EventBase {
  constructor(public id: string, public name: string) {
    super();
  }

  eventName(): string {
    return 'user.deleted';
  }
}
