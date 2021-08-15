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
import { ShareModule } from '../share/share.module';
import { UserDeleteHandler } from './application/delete/user-delete.handler';
import { UserDeleteService } from './application/delete/user-delete.service';
import { UserResolver } from './infrastructure/graph-ql/user.resolver';
import { AppEvents } from './infrastructure/event/events';

export const CommandHandlers = [UserPersistHandler, UserDeleteHandler];
export const QueryHandlers = [UserListHandler, UserFindByIdHandler];
export const Services = [UserPersistService, UserListService, UserFindByIdService, UserDeleteService];

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserFirestoreRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...Services,
    UserResolver,
    ...AppEvents,
  ],
})
export class UserModule {}
