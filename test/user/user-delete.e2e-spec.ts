import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserId } from '../../src/modules/user/domain/user-id';
import { UserName } from '../../src/modules/user/domain/user-name';

describe('User list [userDelete] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll({});
    users.map((user) => {
      userRepository.deleteById(user.id);
    });
  });

  it('delete user', async () => {
    await userRepository.persist(
      new User(
        new UserId('ffade6eb-f4f3-4afe-b141-997f285521c5'),
        new UserName('Guille'),
      ),
    );

    const query = `
          mutation{
            userDelete(input:{id: "ffade6eb-f4f3-4afe-b141-997f285521c5"}){
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

        const user: User = await userRepository.findById(
          new UserId('ffade6eb-f4f3-4afe-b141-997f285521c5'),
        );
        expect(user).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });

  it('delete user not exist', async () => {
    const query = `
          mutation{
            userDelete(input:{id: "b4e05f83-a32f-43a3-8303-d2dcf0b91f4d"}){
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

        const user: User = await userRepository.findById(
          new UserId('ffade6eb-f4f3-4afe-b141-997f285521c5'),
        );
        expect(user).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
