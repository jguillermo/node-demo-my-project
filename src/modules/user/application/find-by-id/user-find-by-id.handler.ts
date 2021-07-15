import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserFindByIdQuery } from './user-find-by-id.query';
import { UserFindByIdService } from './user-find-by-id.service';
import { UserId } from '../../domain/user-id';
import { UserResponse } from '../user.response';

@QueryHandler(UserFindByIdQuery)
export class UserFindByIdHandler implements IQueryHandler<UserFindByIdQuery> {
  constructor(private service: UserFindByIdService) {}

  async execute(query: UserFindByIdQuery): Promise<UserResponse> {
    const id = new UserId(query.id);

    return await this.service.execute(id);
  }
}
