import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CompanyFirestoreRepository } from './infrastructure/persistence/company-firestore.repository';
import { CompanyRepository } from './domain/company.repository';
import { ShareModule } from '../share/share.module';
import { CompanyResolver } from './infrastructure/graph-ql/company.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: CompanyRepository,
      useClass: CompanyFirestoreRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    CompanyResolver,
  ],
})
export class CompanyModule {}
