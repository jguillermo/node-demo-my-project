import { INestApplication } from '@nestjs/common';
import { TestingE2eModule } from '../../testing-e2e-module';
import { CompanyRepository } from '../../../src/company/domain/company.repository';

export interface CompanyTestingInterface {
  app: INestApplication;
  companyRepository: CompanyRepository;
}

export class CompanyE2eModule extends TestingE2eModule {
  static async create(): Promise<CompanyTestingInterface> {
    const module = new CompanyE2eModule();
    await module.init();
    return {
      app: module.app,
      companyRepository: module.moduleFixture.get<CompanyRepository>(CompanyRepository),
    };
  }
}
