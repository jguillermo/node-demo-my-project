import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserListDao } from './user-list.dao';
import { UserListService } from './user-list.service';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { ListUserResponse } from '../list-user.response';
import { PaginatorType } from '../../../share/domain/paginator.type';
import { OrderType } from '../../../share/domain/order.type';

@QueryHandler(UserListDao)
export class UserListHandler implements IQueryHandler<UserListDao> {
  constructor(private service: UserListService) {}

  async execute(dao: UserListDao): Promise<ListUserResponse> {
    const id = new UUIDTypeImp(dao.id);
    const name = new StringTypeImp(dao.name);
    const paginator = PaginatorType.create(
      dao.paginator?.page,
      dao.paginator?.perPage,
    );

    const order = OrderType.create(dao.order?.field, dao.order?.direction);

    return await this.service.execute(id, name, paginator, order);
  }
}
