import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserFirestoreRepository } from '../../infrastructure/persistence/user-firestore.repository';
import { ListUserResponse } from '../list-user.response';
import { UserResponse } from '../user.response';

@Injectable()
export class UserFindAllService {
  constructor(private repository: UserFirestoreRepository) {}

  public async execute(): Promise<ListUserResponse> {
    const listUser = await this.repository.findAll();
    return new ListUserResponse(
      listUser.map((user) => {
        return UserResponse.fromAggregate(user);
      }),
    );
  }
}
