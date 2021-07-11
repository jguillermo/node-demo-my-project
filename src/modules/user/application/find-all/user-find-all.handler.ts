import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserFindAllQuery } from './user-find-all.query';
import { UserFindAllService } from './user-find-all.service';
import { ListUserResponse } from '../list-user.response';

@QueryHandler(UserFindAllQuery)
export class UserFindAllHandler implements IQueryHandler<UserFindAllQuery> {
  constructor(private service: UserFindAllService) {}

  async execute(query: UserFindAllQuery): Promise<ListUserResponse> {
    return await this.service.execute();
  }
}
