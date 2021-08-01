import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDeleteDao } from './user-delete.dao';
import { UserDeleteService } from './user-delete.service';
import { UserId } from '../../domain/user-id';

@CommandHandler(UserDeleteDao)
export class UserDeleteHandler implements ICommandHandler<UserDeleteDao> {
  constructor(private service: UserDeleteService) {}

  async execute(dao: UserDeleteDao): Promise<void> {
    const id = new UserId(dao.id);
    await this.service.execute(id);
  }
}
