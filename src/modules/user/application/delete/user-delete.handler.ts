import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDeleteCommand } from './user-delete.command';
import { UserDeleteService } from './user-delete.service';
import { UserId } from '../../domain/user-id';

@CommandHandler(UserDeleteCommand)
export class UserDeleteHandler implements ICommandHandler<UserDeleteCommand> {
  constructor(private service: UserDeleteService) {}

  async execute(command: UserDeleteCommand): Promise<void> {
    const id = new UserId(command.id);
    await this.service.execute(id);
  }
}
