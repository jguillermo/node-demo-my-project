import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/company.repository';
import { CompanyResponse } from '../company.response';
import { ListCompanyResponse } from '../list-company.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@Injectable()
export class CompanyListService {
  constructor(private repository: CompanyRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
    addressStreet: StringTypeImp,
    addressNumber: NumberTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListCompanyResponse> {
    const listCompany = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: id.value,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: name.value,
        },
        {
          field: 'addressStreet',
          opStr: FilterOpStr.EQUAL_TO,
          value: addressStreet.value,
        },
        {
          field: 'addressNumber',
          opStr: FilterOpStr.EQUAL_TO,
          value: addressNumber.toString,
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