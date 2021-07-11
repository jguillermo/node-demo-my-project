import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserCreateCommand } from '../../modules/user/application/create/user-create.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { UserFindAllQuery } from '../../modules/user/application/find-all/user-find-all.query';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query((returns) => [UserType])
  async users() {
    const data = await this.queryBus.execute(new UserFindAllQuery());
    return data.list;
  }

  @Mutation((returns) => UserType)
  async create(@Args('input') input: UserCreateCommand) {
    input.id = UUIDTypeImp.random();
    await this.commandBus.execute(input);
    return { id: '123', name: 'Guillermo' };
  }
}
