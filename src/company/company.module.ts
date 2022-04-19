import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CompanyRepository } from './domain/company.repository';
import { ShareModule } from '../share/share.module';
import { CompanyResolver } from './infrastructure/graph-ql/company.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';
import {
  CompanyPostgresRepository,
  CompanyTypeOrmRepository,
} from './infrastructure/persistence/postgres/company-postgres.repository';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: CompanyRepository,
      useClass: CompanyPostgresRepository,
    },
    CompanyTypeOrmRepository,
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    CompanyResolver,
  ],
})
export class CompanyModule {}
