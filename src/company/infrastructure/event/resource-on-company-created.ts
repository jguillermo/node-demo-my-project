import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CompanyCreatedEvent } from '../../domain/company-created.event';

@EventsHandler(CompanyCreatedEvent)
export class ResourceOnCompanyCreated implements IEventHandler<CompanyCreatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: CompanyCreatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
