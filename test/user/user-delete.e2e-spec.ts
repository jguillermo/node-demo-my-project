import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/user/domain/user.repository';
import { User } from '../../src/user/domain/user';
import { UserMother } from './user-object-mother';

describe('User list [userDelete] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll();
    for await (const user of users) {
      await userRepository.deleteById(user.id);
    }
  });

  it('delete user', async () => {
    const user = UserMother.create();
    await userRepository.persist(user);
    const query = `
          mutation{
            userDelete(id:"${user.id.value}"){
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
            userDelete: {
              status: 'ok',
            },
          },
        });
        const userDb: User = await userRepository.findById(user.id);
        expect(userDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });

  it('delete user not exist', async () => {
    const user = UserMother.create();
    const query = `
          mutation{
            userDelete(id: "${user.id.value}"){
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
            userDelete: {
              status: 'ok',
            },
          },
        });
        const userDb: User = await userRepository.findById(user.id);
        expect(userDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
