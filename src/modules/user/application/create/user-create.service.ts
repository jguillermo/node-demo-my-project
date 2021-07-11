import { Injectable } from '@nestjs/common';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class UserCreateService {
  constructor(private repository: UserRepository) {}

  public async execute(id: UserId, name: UserName): Promise<void> {
    const user = User.create(id, name);
    await this.repository.persist(user);
    //eventBus.publish(user.pullDomainEvents());
  }
}
