import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserUpdateService {
  constructor(private repository: UserRepository) {}

  public async execute(id: UserId, name: UserName): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.change(id, name);
    await this.repository.persist(user);
    //eventBus.publish(user.pullDomainEvents());
  }
}
