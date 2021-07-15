import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserId } from '../../domain/user-id';
import { UserResponse } from '../user.response';

@Injectable()
export class UserFindByIdService {
  constructor(private repository: UserRepository) {}

  public async execute(id: UserId): Promise<UserResponse> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return UserResponse.fromAggregate(user);
  }
}
