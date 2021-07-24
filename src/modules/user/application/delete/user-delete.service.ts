import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserId } from '../../domain/user-id';

@Injectable()
export class UserDeleteService {
  constructor(private repository: UserRepository) {}

  public async execute(id: UserId): Promise<void> {
    await this.repository.deleteById(id);
    //eventBus.publish(user.pullDomainEvents());
  }
}
