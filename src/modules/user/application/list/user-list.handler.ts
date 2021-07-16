import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserListQuery } from './user-list.query';
import { UserListService } from './user-list.service';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { ListUserResponse } from '../list-user.response';

@QueryHandler(UserListQuery)
export class UserListHandler implements IQueryHandler<UserListQuery> {
  constructor(private service: UserListService) {}

  async execute(query: UserListQuery): Promise<ListUserResponse> {
    const id = new UUIDTypeImp(query.id);
    const name = new StringTypeImp(query.name);

    return await this.service.execute(id, name);
  }
}
