import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserFindByIdQuery } from '../../modules/user/application/find-by-id/user-find-by-id.query';
import { ListUserResponse } from '../../modules/user/application/list-user.response';
import { UserResponse } from '../../modules/user/application/user.response';
import { UserListQuery } from '../../modules/user/application/list/user-list.query';
import { UserPersistCommand } from '../../modules/user/application/persist/user-persist.command';
import { UserDeleteCommand } from '../../modules/user/application/delete/user-delete.command';
import { ResponseStatus } from '../../modules/share/application/applicationResponse';
import { StatusType } from '../status.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [UserType], { name: 'userList' })
  async list(
    @Args('filter', { nullable: true }) filter: UserListQuery,
  ): Promise<UserResponse[]> {
    const data: ListUserResponse = await this.queryBus.execute(filter);
    return data.list;
  }

  @Query(() => UserType, { name: 'user' })
  async aggregate(
    @Args('input') input: UserFindByIdQuery,
  ): Promise<UserResponse> {
    return await this.queryBus.execute(input);
  }

  @Mutation(() => UserType, { name: 'userPersist' })
  async persist(
    @Args('input') input: UserPersistCommand,
  ): Promise<UserResponse> {
    await this.commandBus.execute(input);
    return await this.queryBus.execute(new UserFindByIdQuery(input.id));
  }

  @Mutation(() => StatusType, { name: 'userDelete' })
  async delete(
    @Args('input') input: UserDeleteCommand,
  ): Promise<ResponseStatus> {
    await this.commandBus.execute(input);
    return ResponseStatus.ok();
  }
}
