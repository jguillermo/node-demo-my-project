import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateCommand } from './user-create.command';
import { UserCreateService } from './user-create.service';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  constructor(private service: UserCreateService) {}

  async execute(command: UserCreateCommand): Promise<void> {
    const id = new UserId(command.id);
    const name = new UserName(command.name);

    await this.service.execute(id, name);
  }
}
