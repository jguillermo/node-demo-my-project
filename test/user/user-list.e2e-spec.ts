import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserId } from '../../src/modules/user/domain/user-id';
import { UserName } from '../../src/modules/user/domain/user-name';

describe('User list [listUser] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll({});
    users.map((user) => {
      userRepository.deleteById(user.id);
    });
  });

  it('get empty', async () => {
    const query = `
          query{
            listUser{
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
            listUser: [],
          },
        });
        expect(response.statusCode).toEqual(200);
      });
  });

  it('get all', async () => {
    await userRepository.persist(
      new User(
        new UserId('0c4eeef8-5b32-470f-bdf9-7ec40ecf6877'),
        new UserName('Guille'),
      ),
    );

    const query = `
          query{
            listUser{
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
            listUser: [
              {
                id: '0c4eeef8-5b32-470f-bdf9-7ec40ecf6877',
                name: 'Guille',
              },
            ],
          },
        });

        const user: User = await userRepository.findById(
          new UserId('0c4eeef8-5b32-470f-bdf9-7ec40ecf6877'),
        );
        expect(user).not.toBeNull();
        expect(user.id.value).toEqual('0c4eeef8-5b32-470f-bdf9-7ec40ecf6877');
        expect(user.name.value).toEqual('Guille');

        expect(response.statusCode).toEqual(200);
      });
  });
});
