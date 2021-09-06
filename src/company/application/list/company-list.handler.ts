import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListCompanyResponse } from '../list-company.response';
import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { CompanyListDto } from './company-list.dto';
import { CompanyListService } from './company-list.service';

@QueryHandler(CompanyListDto)
export class CompanyListHandler implements IQueryHandler<CompanyListDto> {
  constructor(private service: CompanyListService) {}

  async execute(dto: CompanyListDto): Promise<ListCompanyResponse> {
    const id = new UUIDTypeImp(dto.id);
    const name = new StringTypeImp(dto.name);

    const addressStreet = new StringTypeImp(dto.address?.street);
    const addressNumber = new NumberTypeImp(dto.address?.number);

    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);

    return await this.service.execute(id, name, addressStreet, addressNumber, paginator, order);
  }
}
