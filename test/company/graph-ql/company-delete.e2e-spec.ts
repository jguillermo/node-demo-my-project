import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CompanyE2eModule } from './company-e2e-module';
import { CompanyRepository } from '../../../src/company/domain/company.repository';
import { CompanyMother } from '../company-object-mother';

describe('GraphQl Company (companyDelete)', () => {
  let app: INestApplication;
  let repository: CompanyRepository;
  beforeEach(async () => {
    ({ app, companyRepository: repository } = await CompanyE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('delete', async () => {
    const company = CompanyMother.create();
    await repository.persist(company);
    const query = `
          mutation{
            companyDelete(id:"${company.id.value}"){
              status
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            companyDelete: {
              status: 'ok',
            },
          },
        });
        const companyDb = await repository.findById(company.id);
        expect(companyDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });

  it('delete not exist item', async () => {
    const company = CompanyMother.create();
    const query = `
          mutation{
            companyDelete(id: "${company.id.value}"){
              status
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            companyDelete: {
              status: 'ok',
            },
          },
        });
        const companyDb = await repository.findById(company.id);
        expect(companyDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
