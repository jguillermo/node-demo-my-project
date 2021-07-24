import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserPersistCommand } from './user-persist.command';
import { UserPersistService } from './user-persist.service';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';

@CommandHandler(UserPersistCommand)
export class UserPersistHandler implements ICommandHandler<UserPersistCommand> {
  constructor(private service: UserPersistService) {}

  async execute(command: UserPersistCommand): Promise<void> {
    const id = new UserId(command.id);
    const name = new UserName(command.name);

    await this.service.execute(id, name);
  }
}
