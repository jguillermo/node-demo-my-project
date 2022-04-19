import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './domain/user.repository';
import { ShareModule } from '../share/share.module';
import { UserResolver } from './infrastructure/graph-ql/user.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';
import { UserPostgresRepository } from './infrastructure/persistence/postgres/user-postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from './infrastructure/persistence/postgres/user.dao';

@Module({
  imports: [CqrsModule, ShareModule, TypeOrmModule.forFeature([UserDao])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPostgresRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    UserResolver,
  ],
})
export class UserModule {}
