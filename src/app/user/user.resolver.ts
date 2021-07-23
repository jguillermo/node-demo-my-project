import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserCreateCommand } from '../../modules/user/application/create/user-create.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { UserFindByIdQuery } from '../../modules/user/application/find-by-id/user-find-by-id.query';
import { ListUserResponse } from '../../modules/user/application/list-user.response';
import { UserResponse } from '../../modules/user/application/user.response';
import { UserListQuery } from '../../modules/user/application/list/user-list.query';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [UserType], { name: 'listUser' })
  async list(
    @Args('filter', { nullable: true }) filter: UserListQuery,
  ): Promise<UserResponse[]> {
    const data: ListUserResponse = await this.queryBus.execute(filter);
    return data.list;
  }

  @Mutation(() => UserType, { name: 'createUser' })
  async create(@Args('input') input: UserCreateCommand) {
    input.id = UUIDTypeImp.random();
    await this.commandBus.execute(input);
    return await this.queryBus.execute(new UserFindByIdQuery(input.id));
  }
}
