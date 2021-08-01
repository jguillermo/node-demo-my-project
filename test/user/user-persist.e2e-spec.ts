import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserMother } from './user-object-mother';

describe('User Create [userPersist] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll();
    for await (const user of users) {
      await userRepository.deleteById(user.id);
    }
  });

  it('data persist ok', () => {
    const user = UserMother.create();
    const query = `
          mutation{
            userPersist(input:{
              id: "${user.id.value}"
              name: "${user.name.value}"
            }){
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
            userPersist: {
              id: user.id.value,
              name: user.name.value,
            },
          },
        });
        const userDb: User = await userRepository.findById(user.id);
        expect(userDb).not.toBeNull();
        expect(userDb.id.value).toEqual(user.id.value);
        expect(userDb.name.value).toEqual(user.name.value);
        expect(response.statusCode).toEqual(200);
      });
  });

  it('data update ok', async () => {
    const user = UserMother.create();
    await userRepository.persist(user);
    const query = `
          mutation{
            userPersist(input:{
              id: "${user.id.value}"
              name: "${user.name.value}"
            }){
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
            userPersist: {
              id: user.id.value,
              name: user.name.value,
            },
          },
        });
        const userDb: User = await userRepository.findById(user.id);
        expect(userDb).not.toBeNull();
        expect(userDb.id.value).toEqual(user.id.value);
        expect(userDb.name.value).toEqual(user.name.value);
        expect(response.statusCode).toEqual(200);
      });
  });

  it('data error', () => {
    const user = UserMother.create();
    const query = `
          mutation{
            userPersist(input:{
              name: "${user.name.value}"
            }){
              id
              name
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0]).toBeDefined();
        expect(response.body.errors[0].message).toEqual(
          'Field "UserPersistInput.id" of required type "String!" was not provided.',
        );
        const userDb: User = await userRepository.findById(user.id);
        expect(userDb).toBeNull();
        // todo, code must be 200
        expect(response.statusCode).toEqual(400);
      });
  });
});
