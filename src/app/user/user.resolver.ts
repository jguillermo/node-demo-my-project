import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserFindByIdQuery } from '../../modules/user/application/find-by-id/user-find-by-id.query';
import { ListUserResponse } from '../../modules/user/application/list-user.response';
import { UserResponse } from '../../modules/user/application/user.response';
import { UserListQuery } from '../../modules/user/application/list/user-list.query';
import { UserPersistCommand } from '../../modules/user/application/persist/user-persist.command';

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

  @Mutation(() => UserType, { name: 'userPersist' })
  async persist(@Args('input') input: UserPersistCommand) {
    await this.commandBus.execute(input);
    return await this.queryBus.execute(new UserFindByIdQuery(input.id));
  }
}
