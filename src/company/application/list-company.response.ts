import { CompanyResponse } from './company.response';

export class ListCompanyResponse {
  public list: CompanyResponse[];

  constructor(list: CompanyResponse[]) {
    this.list = list;
  }
}
