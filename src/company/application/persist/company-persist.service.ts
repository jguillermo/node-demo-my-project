import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CompanyRepository } from '../../domain/company.repository';
import { Company } from '../../domain/company';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddress } from '../../domain/company-address';

@Injectable()
export class CompanyPersistService {
  constructor(private repository: CompanyRepository, private eventBus: EventBus) {}

  public async execute(id: CompanyId, name: CompanyName, address: CompanyAddress): Promise<void> {
    let company = await this.repository.findById(id);
    if (!company) {
      company = Company.create(id, name, address);
    } else {
      company.update(name, address);
    }
    await this.repository.persist(company);
    this.eventBus.publishAll(company.pullDomainEvents());
  }
}
