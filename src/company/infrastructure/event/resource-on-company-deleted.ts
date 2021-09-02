import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CompanyDeletedEvent } from '../../domain/company-deleted.event';

@EventsHandler(CompanyDeletedEvent)
export class ResourceOnCompanyDeleted implements IEventHandler<CompanyDeletedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: CompanyDeletedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
