import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand> {
  constructor(private service: UserUpdateService) {}

  async execute(command: UserUpdateCommand): Promise<void> {
    const id = new UserId(command.id);
    const name = new UserName(command.name);

    await this.service.execute(id, name);
  }
}
