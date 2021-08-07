import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { ListUserResponse } from '../list-user.response';
import { UserResponse } from '../user.response';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { FilterOpStr } from '../../../share/domain/repository';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';

@Injectable()
export class UserListService {
  constructor(private repository: UserRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListUserResponse> {
    const listUser = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: id.value,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: name.value,
        },
      ],
      paginator,
      order,
    );
    return new ListUserResponse(
      listUser.map((user) => {
        return UserResponse.fromAggregate(user);
      }),
    );
  }
}
