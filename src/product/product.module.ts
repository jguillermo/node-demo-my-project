import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductRepository } from './domain/product.repository';
import { ShareModule } from '../share/share.module';
import { ProductResolver } from './infrastructure/graph-ql/product.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';
import { ProductFirestoreRepository } from './infrastructure/persistence/product-firestore.repository';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductFirestoreRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    ProductResolver,
  ],
})
export class ProductModule {}
