import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';
import { UserCreateService } from './application/create/user-create.service';
import { UserCreateHandler } from './application/create/user-create.handler';
import { UserRepository } from './domain/user.repository';
import { UserFindByIdService } from './application/find-by-id/user-find-by-id.service';
import { UserFindByIdHandler } from './application/find-by-id/user-find-by-id.handler';
import { UserListHandler } from './application/list/user-list.handler';
import { UserListService } from './application/list/user-list.service';

export const CommandHandlers = [UserCreateHandler];
export const QueryHandlers = [UserListHandler, UserFindByIdHandler];
export const Services = [
  UserCreateService,
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
