import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CompanyResponse } from '../company.response';
import { CompanyId } from '../../domain/company-id';
import { CompanyFindByIdDto } from './company-find-by-id.dto';
import { CompanyFindByIdService } from './company-find-by-id.service';

@QueryHandler(CompanyFindByIdDto)
export class CompanyFindByIdHandler implements IQueryHandler<CompanyFindByIdDto> {
  constructor(private service: CompanyFindByIdService) {}

  async execute(dto: CompanyFindByIdDto): Promise<CompanyResponse> {
    const id = new CompanyId(dto.id);

    return await this.service.execute(id);
  }
}
