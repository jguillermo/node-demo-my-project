import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';
import { UserRepository } from './domain/user.repository';
import { UserFindByIdService } from './application/find-by-id/user-find-by-id.service';
import { UserFindByIdHandler } from './application/find-by-id/user-find-by-id.handler';
import { UserListHandler } from './application/list/user-list.handler';
import { UserListService } from './application/list/user-list.service';
import { UserPersistService } from './application/persist/user-persist.service';
import { UserPersistHandler } from './application/persist/user-persist.handler';

export const CommandHandlers = [UserPersistHandler];
export const QueryHandlers = [UserListHandler, UserFindByIdHandler];
export const Services = [
  UserPersistService,
  UserListService,
  UserFindByIdService,
];

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserFirestoreRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...Services,
  ],
})
export class UserModule {}
