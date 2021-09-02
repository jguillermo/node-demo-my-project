import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompanyDeleteService } from './company-delete.service';
import { CompanyDeleteDto } from './company-delete.dto';
import { CompanyId } from '../../domain/company-id';

@CommandHandler(CompanyDeleteDto)
export class CompanyDeleteHandler implements ICommandHandler<CompanyDeleteDto> {
  constructor(private service: CompanyDeleteService) {}

  async execute(dto: CompanyDeleteDto): Promise<void> {
    const id = new CompanyId(dto.id);

    await this.service.execute(id);
  }
}
