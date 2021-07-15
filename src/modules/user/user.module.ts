import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';
import { UserCreateService } from './application/create/user-create.service';
import { UserCreateHandler } from './application/create/user-create.handler';
import { UserFindAllService } from './application/find-all/user-find-all.service';
import { UserFindAllHandler } from './application/find-all/user-find-all.handler';
import { UserRepository } from './domain/user.repository';
import { UserFindByIdService } from './application/find-by-id/user-find-by-id.service';
import { UserFindByIdHandler } from './application/find-by-id/user-find-by-id.handler';

export const CommandHandlers = [UserCreateHandler];
export const QueryHandlers = [UserFindAllHandler, UserFindByIdHandler];
export const Services = [
  UserCreateService,
  UserFindAllService,
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
