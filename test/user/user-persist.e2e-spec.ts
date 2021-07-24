import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestingE2EModule } from '../testing-e2-e-module';
import { UserRepository } from '../../src/modules/user/domain/user.repository';
import { User } from '../../src/modules/user/domain/user';
import { UserId } from '../../src/modules/user/domain/user-id';
import { UserName } from '../../src/modules/user/domain/user-name';

describe('User Create [userPersist] (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository } = await TestingE2EModule.create());
    const users = await userRepository.findAll({});
    users.map((user) => {
      userRepository.deleteById(user.id);
    });
  });

  it('data persist ok', () => {
    const query = `
          mutation{
            userPersist(input:{
              id: "593b9dfe-79ff-4b6e-b75f-6159e3f340a9"
              name: "guille"
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
              id: '593b9dfe-79ff-4b6e-b75f-6159e3f340a9',
              name: 'guille',
            },
          },
        });
        const user: User = await userRepository.findById(
          new UserId('593b9dfe-79ff-4b6e-b75f-6159e3f340a9'),
        );
        expect(user).not.toBeNull();
        expect(user.id.value).toEqual('593b9dfe-79ff-4b6e-b75f-6159e3f340a9');
        expect(user.name.value).toEqual('guille');

        expect(response.statusCode).toEqual(200);
      });
  });

  it('data update ok', async () => {
    await userRepository.persist(
      new User(
        new UserId('eefbaa19-d8c8-4f62-8507-03b83b70a019'),
        new UserName('Jose'),
      ),
    );

    const query = `
          mutation{
            userPersist(input:{
              id: "eefbaa19-d8c8-4f62-8507-03b83b70a019"
              name: "guille"
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
              id: 'eefbaa19-d8c8-4f62-8507-03b83b70a019',
              name: 'guille',
            },
          },
        });
        const user: User = await userRepository.findById(
          new UserId('eefbaa19-d8c8-4f62-8507-03b83b70a019'),
        );
        expect(user).not.toBeNull();
        expect(user.id.value).toEqual('eefbaa19-d8c8-4f62-8507-03b83b70a019');
        expect(user.name.value).toEqual('guille');

        expect(response.statusCode).toEqual(200);
      });
  });

  it('data error', () => {
    const query = `
          mutation{
            userPersist(input:{
              name: "guille"
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
        const user: User = await userRepository.findById(
          new UserId('593b9dfe-79ff-4b6e-b75f-6159e3f340a9'),
        );
        expect(user).toBeNull();
        // todo, code must be 200
        expect(response.statusCode).toEqual(400);
      });
  });
});
