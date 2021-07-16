import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserId } from '../../src/modules/user/domain/user-id';

describe('User Create [createUser] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll({});
    users.map((user) => {
      userRepository.deleteById(user.id);
    });
  });

  it('data ok', () => {
    const query = `
          mutation{
            createUser(input:{
              name:"guille"
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
        expect(response.body.data.createUser.id).toBeDefined();
        const data = response.body.data;

        expect(data.createUser.id).toBeDefined();
        expect(data.createUser.name).toBeDefined();
        expect(data.createUser.name).toEqual('guille');

        const user: User = await userRepository.findById(
          new UserId(data.createUser.id),
        );
        expect(user).not.toBeNull();
        expect(user.id.value).toEqual(data.createUser.id);
        expect(user.name.value).toEqual('guille');

        expect(response.statusCode).toEqual(200);
      });
  });
});
