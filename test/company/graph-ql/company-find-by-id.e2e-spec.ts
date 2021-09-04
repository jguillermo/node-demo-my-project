import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CompanyE2eModule } from './company-e2e-module';
import { CompanyRepository } from '../../../src/company/domain/company.repository';
import { CompanyMother } from '../company-object-mother';

describe('GraphQl Company (company)', () => {
  let app: INestApplication;
  let repository: CompanyRepository;
  beforeEach(async () => {
    ({ app, companyRepository: repository } = await CompanyE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('get', async () => {
    const company = CompanyMother.create();
    await repository.persist(company);
    const query = `
          query{
            company(id: "${company.id.value}"){
              id
              name
              address{
                street
                number
              }
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            company: {
              id: company.id.value,
              name: company.name.value,
              address: {
                street: company.address.street.value,
                number: company.address.number.value,
              },
            },
          },
        });
        const companyDb = await repository.findById(company.id);
        expect(companyDb).not.toBeNull();
        expect(companyDb.id.value).toEqual(company.id.value);
        expect(companyDb.name.value).toEqual(company.name.value);
        expect(companyDb.address.street.value).toEqual(company.address.street.value);
        expect(companyDb.address.number.value).toEqual(company.address.number.value);
        expect(response.statusCode).toEqual(200);
      });
  });

  it('get not exit', async () => {
    const company = CompanyMother.create();
    const query = `
          query{
            company(id: "${company.id.value}"){
              id
              name
              address{
                street
                number
              }
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            company: null,
          },
        });
        const companyDb = await repository.findById(company.id);
        expect(companyDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});