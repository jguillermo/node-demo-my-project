import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../../testing-e2-e-module';
import { UserRepository } from '../../../src/user/domain/user.repository';
import { UserMother } from '../user-object-mother';

describe('User list [userList] (e2e)', () => {
  let app: INestApplication;
  let repository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository: repository } = await TestingE2EModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });
  describe('whitout filter', () => {
    it('get all', async () => {
      const user = UserMother.create();
      await repository.persist(user);
      const query = `
          query{
            userList{
              id
              name
            }
          }
          `;
      return request(app.getHttpServer())
        .post(`/graphql`)
        .send({ query: query, variables: {} })
        .then(async (response) => {
          expect(response.body).toEqual({
            data: {
              userList: [
                {
                  id: user.id.value,
                  name: user.name.value,
                },
              ],
            },
          });
          const userDb = await repository.findById(user.id);
          expect(userDb).not.toBeNull();
          expect(userDb.id.value).toEqual(user.id.value);
          expect(userDb.name.value).toEqual(user.name.value);
          expect(response.statusCode).toEqual(200);
        });
    });
  });

  describe('all filter', () => {
    it('get all', async () => {
      const user = UserMother.create();
      await repository.persist(user);
      const query = `
          query{
            userList(id:"${user.id.value}",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
              id
              name
            }
          }
          `;
      return request(app.getHttpServer())
        .post(`/graphql`)
        .send({ query: query, variables: {} })
        .then(async (response) => {
          expect(response.body).toEqual({
            data: {
              userList: [
                {
                  id: user.id.value,
                  name: user.name.value,
                },
              ],
            },
          });
          const userDb = await repository.findById(user.id);
          expect(userDb).not.toBeNull();
          expect(userDb.id.value).toEqual(user.id.value);
          expect(userDb.name.value).toEqual(user.name.value);
          expect(response.statusCode).toEqual(200);
        });
    });
  });
});
