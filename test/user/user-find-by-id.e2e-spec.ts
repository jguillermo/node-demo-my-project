import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserId } from '../../src/modules/user/domain/user-id';
import { UserName } from '../../src/modules/user/domain/user-name';

describe('User entity [user] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll();
    users.map((user) => {
      userRepository.deleteById(user.id);
    });
  });

  it('get empty', async () => {
    await userRepository.persist(
      new User(
        new UserId('7e2c8280-a736-4574-b989-e17e6db7a70e'),
        new UserName('Guille'),
      ),
    );
    const query = `
          query{
            user(input:{id: "7e2c8280-a736-4574-b989-e17e6db7a70e"}){
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
            user: {
              id: '7e2c8280-a736-4574-b989-e17e6db7a70e',
              name: 'Guille',
            },
          },
        });
        const user: User = await userRepository.findById(
          new UserId('7e2c8280-a736-4574-b989-e17e6db7a70e'),
        );
        expect(user).not.toBeNull();
        expect(user.id.value).toEqual('7e2c8280-a736-4574-b989-e17e6db7a70e');
        expect(user.name.value).toEqual('Guille');

        expect(response.statusCode).toEqual(200);
      });
  });

  it('get not exit', async () => {
    const query = `
          query{
            user(input:{id: "9e190c8f-20d4-41fe-b114-df8782a511c3"}){
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
            user: null,
          },
        });
        const user: User = await userRepository.findById(
          new UserId('9e190c8f-20d4-41fe-b114-df8782a511c3'),
        );
        expect(user).toBeNull();

        expect(response.statusCode).toEqual(200);
      });
  });
});
