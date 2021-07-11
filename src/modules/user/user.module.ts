import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';
import { UserCreateService } from './application/create/user-create.service';
import { UserCreateHandler } from './application/create/user-create.handler';
import { UserFindAllService } from './application/find-all/user-find-all.service';
import { UserFindAllHandler } from './application/find-all/user-find-all.handler';

export const CommandHandlers = [UserCreateHandler];
export const QueryHandlers = [UserFindAllHandler];
export const Services = [UserCreateService, UserFindAllService];

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
