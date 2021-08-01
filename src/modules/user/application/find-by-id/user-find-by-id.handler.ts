import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserFindByIdDao } from './user-find-by-id.dao';
import { UserFindByIdService } from './user-find-by-id.service';
import { UserId } from '../../domain/user-id';
import { UserResponse } from '../user.response';

@QueryHandler(UserFindByIdDao)
export class UserFindByIdHandler implements IQueryHandler<UserFindByIdDao> {
  constructor(private service: UserFindByIdService) {}

  async execute(dao: UserFindByIdDao): Promise<UserResponse> {
    const id = new UserId(dao.id);

    return await this.service.execute(id);
  }
}
