import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CompanyRepository } from '../../domain/company.repository';
import { Company } from '../../domain/company';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddressStreet } from '../../domain/company-address-street';
import { CompanyAddressNumber } from '../../domain/company-address-number';

@Injectable()
export class CompanyPersistService {
  constructor(private repository: CompanyRepository, private eventBus: EventBus) {}

  public async execute(
    id: CompanyId,
    name: CompanyName,
    addressStreet: CompanyAddressStreet,
    addressNumber: CompanyAddressNumber,
  ): Promise<void> {
    let company = await this.repository.findById(id);
    if (!company) {
      company = Company.create(id, name, addressStreet, addressNumber);
    } else {
      company.update(name, addressStreet, addressNumber);
    }
    await this.repository.persist(company);
    this.eventBus.publishAll(company.pullDomainEvents());
  }
}
