import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
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
  async list(
    @Args('filter', { nullable: true }) filter: UserListDao,
  ): Promise<UserResponse[]> {
    const data: ListUserResponse = await this.queryBus.execute(filter);
    return data.list;
  }

  @Query(() => UserType, { name: 'user', nullable: true })
  async aggregate(
    @Args('input') input: UserFindByIdDao,
  ): Promise<UserResponse | null> {
    return await this.queryBus.execute(input);
  }

  @Mutation(() => UserType, { name: 'userPersist' })
  async persist(@Args('input') input: UserPersistDao): Promise<UserResponse> {
    await this.commandBus.execute(input);
    return await this.queryBus.execute(new UserFindByIdDao(input.id));
  }

  @Mutation(() => StatusType, { name: 'userDelete' })
  async delete(@Args('input') input: UserDeleteDao): Promise<ResponseStatus> {
    await this.commandBus.execute(input);
    return ResponseStatus.ok();
  }
}
