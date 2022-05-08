import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CompanyRepository } from '../../domain/company.repository';
import { CompanyId } from '../../domain/company-id';

@Injectable()
export class CompanyDeleteService {
  constructor(private repository: CompanyRepository, private eventBus: EventBus) {}

  public async execute(id: CompanyId): Promise<void> {
    const company = await this.repository.findById(id);
    if (company) {
      company.delete();
      await this.repository.deleteById(company.id);
      this.eventBus.publishAll(company.pullDomainEvents());
    }
  }
}
