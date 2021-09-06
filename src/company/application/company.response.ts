import { Company } from '../domain/company';
import { CompanyAddress } from '../domain/company-address';

export class CompanyResponse {
  constructor(public id: string, public name: string, public address: CompanyAddressResponse) {}

  static fromAggregate(company: Company) {
    return new CompanyResponse(company.id.value, company.name.value, CompanyAddressResponse.create(company.address));
  }
}

class CompanyAddressResponse {
  constructor(public street: string, public number: number) {}

  static create(address: CompanyAddress) {
    return new CompanyAddressResponse(address.street.value, address.number.value);
  }
}
