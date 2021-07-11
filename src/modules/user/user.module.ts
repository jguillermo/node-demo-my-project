import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';
import { UserCreateService } from './application/create/user-create.service';
import { UserCreateHandler } from './application/create/user-create.handler';

export const CommandHandlers = [UserCreateHandler];
export const QueryHandlers = [];
export const Services = [UserCreateService];

@Module({
  imports: [CqrsModule],
  providers: [
    UserFirestoreRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Services,
  ],
})
export class UserModule {}
