import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CompanyRepository } from './domain/company.repository';
import { ShareModule } from '../share/share.module';
import { CompanyResolver } from './infrastructure/graph-ql/company.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';
import { CompanyPostgresRepository } from './infrastructure/persistence/postgres/company-postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDao } from './infrastructure/persistence/postgres/company.dao';

@Module({
  imports: [CqrsModule, ShareModule, TypeOrmModule.forFeature([CompanyDao])],
  providers: [
    {
      provide: CompanyRepository,
      useClass: CompanyPostgresRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    CompanyResolver,
  ],
})
export class CompanyModule {}
