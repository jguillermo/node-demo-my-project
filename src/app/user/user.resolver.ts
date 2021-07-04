import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';

@Resolver(of => UserType)
export class UserResolver {
  @Query(returns => UserType)
  async getAll() {
    return [];
  }
}