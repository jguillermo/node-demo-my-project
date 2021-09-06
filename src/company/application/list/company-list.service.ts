import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/company.repository';
import { CompanyResponse } from '../company.response';
import { ListCompanyResponse } from '../list-company.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { CompanyListDto } from './company-list.dto';

@Injectable()
export class CompanyListService {
  constructor(private repository: CompanyRepository) {}

  public async execute(
    dto: CompanyListDto,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListCompanyResponse> {
    const listCompany = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.id,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.name,
        },
        {
          field: 'address.street',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.address?.street,
        },
        {
          field: 'address.number',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.address?.number,
        },
      ],
      paginator,
      order,
    );
    return new ListCompanyResponse(
      listCompany.map((company) => {
        return CompanyResponse.fromAggregate(company);
      }),
    );
  }
}
