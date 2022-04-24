import { INestApplication } from '@nestjs/common';
import { NestTestModule } from './nest-test-module';
import { CompanyRepository } from '../../src/company/domain/company.repository';

export interface CompanyTestingInterface {
  app: INestApplication;
  companyRepository: CompanyRepository;
}

export class CompanyBDDModule extends NestTestModule {
  static async create(): Promise<CompanyTestingInterface> {
    const module = new CompanyBDDModule();
    await module.init();
    return {
      app: module.app,
      companyRepository: module.moduleFixture.get<CompanyRepository>(CompanyRepository),
    };
  }
}
