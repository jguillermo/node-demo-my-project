import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListCompanyResponse } from '../list-company.response';
import { CompanyListDto } from './company-list.dto';
import { CompanyListService } from './company-list.service';

@QueryHandler(CompanyListDto)
export class CompanyListHandler implements IQueryHandler<CompanyListDto> {
  constructor(private service: CompanyListService) {}

  async execute(dto: CompanyListDto): Promise<ListCompanyResponse> {
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);
    return await this.service.execute(dto, paginator, order);
  }
}
