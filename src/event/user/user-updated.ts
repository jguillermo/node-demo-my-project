import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from '../../modules/user/domain/user-updated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserUpdatedEvent)
export class UserUpdated implements IEventHandler<UserUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: UserUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
