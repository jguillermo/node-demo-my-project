import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../domain/company.repository';
import { CompanyResponse } from '../company.response';
import { CompanyId } from '../../domain/company-id';

@Injectable()
export class CompanyFindByIdService {
  constructor(private repository: CompanyRepository) {}

  public async execute(id: CompanyId): Promise<CompanyResponse | null> {
    const company = await this.repository.findById(id);
    if (!company) {
      return null;
    }
    return CompanyResponse.fromAggregate(company);
  }
}
