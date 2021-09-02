import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CompanyUpdatedEvent } from '../../domain/company-updated.event';

@EventsHandler(CompanyUpdatedEvent)
export class ResourceOnCompanyUpdated implements IEventHandler<CompanyUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: CompanyUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
