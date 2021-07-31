import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserListQuery } from './user-list.query';
import { UserListService } from './user-list.service';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { ListUserResponse } from '../list-user.response';
import { PaginatorType } from '../../../share/domain/paginator.type';
import { OrderType } from '../../../share/domain/order.type';

@QueryHandler(UserListQuery)
export class UserListHandler implements IQueryHandler<UserListQuery> {
  constructor(private service: UserListService) {}

  async execute(query: UserListQuery): Promise<ListUserResponse> {
    const id = new UUIDTypeImp(query.id);
    const name = new StringTypeImp(query.name);
    const paginator = PaginatorType.create(
      query.paginator?.page,
      query.paginator?.perPage,
    );

    const order = OrderType.create(query.order?.field, query.order?.direction);

    return await this.service.execute(id, name, paginator, order);
  }
}
