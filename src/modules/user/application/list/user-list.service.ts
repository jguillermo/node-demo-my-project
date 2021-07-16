import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { ListUserResponse } from '../list-user.response';
import { UserResponse } from '../user.response';

@Injectable()
export class UserListService {
  constructor(private repository: UserRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
  ): Promise<ListUserResponse> {
    const listUser = await this.repository.findAll({ id, name });
    return new ListUserResponse(
      listUser.map((user) => {
        return UserResponse.fromAggregate(user);
      }),
    );
  }
}
