import { EventBase } from '../../share/domain/event-base';

export class UserUpdatedEvent extends EventBase {
  constructor(public id: string, public name: string) {
    super();
  }

  eventName(): string {
    return 'user.updated';
  }
}
