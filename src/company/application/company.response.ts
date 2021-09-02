import { Company } from '../domain/company';

export class CompanyResponse {
  constructor(public id: string, public name: string, public addressStreet: string, public addressNumber: number) {}

  static fromAggregate(company: Company) {
    return new CompanyResponse(
      company.id.value,
      company.name.value,
      company.addressStreet.value,
      company.addressNumber.value,
    );
  }
}
