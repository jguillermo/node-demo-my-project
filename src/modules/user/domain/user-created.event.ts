import { EventBase } from '../../share/domain/event-base';

export class UserCreatedEvent extends EventBase {
  constructor(public id: string, public name: string) {
    super();
  }

  eventName(): string {
    return 'user.created';
  }
}
