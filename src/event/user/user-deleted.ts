import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserDeletedEvent } from '../../modules/user/domain/user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UserDeleted implements IEventHandler<UserDeletedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: UserDeletedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
