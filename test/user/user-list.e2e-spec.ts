import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserMother } from './user-object-mother';

describe('User list [userList] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll();
    for await (const user of users) {
      await userRepository.deleteById(user.id);
    }
  });
  describe('whitout filter', () => {
    it('get empty', async () => {
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
              userList: [],
            },
          });
          expect(response.statusCode).toEqual(200);
        });
    });

    it('get all', async () => {
      const user = UserMother.create();
      await userRepository.persist(user);
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
          const userDb: User = await userRepository.findById(user.id);
          expect(userDb).not.toBeNull();
          expect(userDb.id.value).toEqual(user.id.value);
          expect(userDb.name.value).toEqual(user.name.value);
          expect(response.statusCode).toEqual(200);
        });
    });
  });

  describe('filter one filter', () => {
    it('id', async () => {
      const user1 = UserMother.create();
      const user2 = UserMother.create();

      await userRepository.persist(user1);
      await userRepository.persist(user2);

      const query = `
          query{
            userList(filter:{id:"${user1.id.value}"}){
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
                  id: user1.id.value,
                  name: user1.name.value,
                },
              ],
            },
          });
          expect(response.statusCode).toEqual(200);
        });
    });
    it('name', async () => {
      const user1 = UserMother.create();
      const user2 = UserMother.create();

      await userRepository.persist(user1);
      await userRepository.persist(user2);

      const query = `
          query{
            userList(filter:{name:"${user1.name.value}"}){
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
                  id: user1.id.value,
                  name: user1.name.value,
                },
              ],
            },
          });
          expect(response.statusCode).toEqual(200);
        });
    });
  });

  describe('paginator', () => {
    it('page 1 perPage 1', async () => {
      const user1 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e01',
      });
      const user2 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e02',
      });
      const user3 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e03',
      });

      await userRepository.persist(user1);
      await userRepository.persist(user2);
      await userRepository.persist(user3);

      const query = `
          query{
            userList(filter:{paginator:{page:1, perPage:1}}){
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
                  id: user1.id.value,
                  name: user1.name.value,
                },
              ],
            },
          });
          expect(response.statusCode).toEqual(200);
        });
    });
  });

  describe('order', () => {
    it('should return 2 items desc', async () => {
      const user1 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e01',
      });
      const user2 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e02',
      });

      await userRepository.persist(user1);
      await userRepository.persist(user2);

      const query = `
          query{
            userList(filter:{order:{field:"id", direction:"desc"}}){
              id
              name
            }
          }
          `;
      return request(app.getHttpServer())
        .post(`/graphql`)
        .send({ query: query, variables: {} })
        .then(async (response) => {
          expect(response.body.data.userList[0].id).toEqual(user2.id.value);
          expect(response.body.data.userList[1].id).toEqual(user1.id.value);
          expect(response.statusCode).toEqual(200);
        });
    });
    it('should return 2 items asc', async () => {
      const user1 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e01',
      });
      const user2 = UserMother.create({
        id: 'fb9525a6-0288-4e20-ae41-fc1939c37e02',
      });

      await userRepository.persist(user1);
      await userRepository.persist(user2);

      const query = `
          query{
            userList(filter:{order:{field:"id", direction:"asc"}}){
              id
              name
            }
          }
          `;
      return request(app.getHttpServer())
        .post(`/graphql`)
        .send({ query: query, variables: {} })
        .then(async (response) => {
          expect(response.body.data.userList[0].id).toEqual(user1.id.value);
          expect(response.body.data.userList[1].id).toEqual(user2.id.value);
          expect(response.statusCode).toEqual(200);
        });
    });
  });
});
