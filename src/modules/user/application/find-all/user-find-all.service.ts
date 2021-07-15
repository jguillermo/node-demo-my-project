import { Injectable } from '@nestjs/common';
import { ListUserResponse } from '../list-user.response';
import { UserResponse } from '../user.response';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class UserFindAllService {
  constructor(private repository: UserRepository) {}

  public async execute(): Promise<ListUserResponse> {
    const listUser = await this.repository.findAll();
    return new ListUserResponse(
      listUser.map((user) => {
        return UserResponse.fromAggregate(user);
      }),
    );
  }
}
