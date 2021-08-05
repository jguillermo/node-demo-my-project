import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../modules/user/domain/user-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent)
export class UserCreated implements IEventHandler<UserCreatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: UserCreatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
