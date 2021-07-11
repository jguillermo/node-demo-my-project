import { Injectable } from '@nestjs/common';
import { UserFirestoreRepository } from '../../infrastructure/persistence/user-firestore.repository';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';
import { User } from '../../domain/user';

@Injectable()
export class UserCreateService {
  constructor(private repository: UserFirestoreRepository) {}

  public async execute(id: UserId, name: UserName): Promise<void> {
    const user = User.create(id, name);
    await this.repository.persist(user);
    //eventBus.publish(user.pullDomainEvents());
  }
}
