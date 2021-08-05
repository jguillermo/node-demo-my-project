import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultUserPersist, UserType } from './user.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserFindByIdDao } from '../../modules/user/application/find-by-id/user-find-by-id.dao';
import { ListUserResponse } from '../../modules/user/application/list-user.response';
import { UserResponse } from '../../modules/user/application/user.response';
import { UserListDao } from '../../modules/user/application/list/user-list.dao';
import { UserPersistDao } from '../../modules/user/application/persist/user-persist.dao';
import { UserDeleteDao } from '../../modules/user/application/delete/user-delete.dao';
import { ResponseStatus } from '../../modules/share/application/applicationResponse';
import { StatusType } from '../status.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [UserType], { name: 'userList' })
  async list(@Args() args: UserListDao): Promise<UserResponse[]> {
    const data: ListUserResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @Query(() => UserType, { name: 'user', nullable: true })
  async aggregate(@Args() args: UserFindByIdDao): Promise<UserResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultUserPersist, { name: 'userPersist' })
  async persist(@Args() args: UserPersistDao) {
    await this.commandBus.execute(args);
    return args.showEntity
      ? await this.queryBus.execute(new UserFindByIdDao(args.id))
      : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'userDelete' })
  async delete(@Args() args: UserDeleteDao): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
