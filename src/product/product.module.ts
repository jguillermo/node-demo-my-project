import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductRepository } from './domain/product.repository';
import { ShareModule } from '../share/share.module';
import { ProductResolver } from './infrastructure/graph-ql/product.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDao } from './infrastructure/persistence/postgres/product.dao';
import { ProductPostgresRepository } from './infrastructure/persistence/postgres/product-postgres.repository';

@Module({
  imports: [CqrsModule, ShareModule, TypeOrmModule.forFeature([ProductDao])],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductPostgresRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    ProductResolver,
  ],
})
export class ProductModule {}
