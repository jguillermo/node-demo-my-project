import { validate } from 'class-validator';
import { UserPersistDto } from './user-persist.dto';

describe('User dto', () => {
  describe('validate ok', () => {
    it('all correct', async () => {
      const userDao = new UserPersistDto();
      userDao.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(0);
    });
  });
  describe('validate id', () => {
    it('id null', async () => {
      const userDao = new UserPersistDto();
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator: 'id: is required.',
      });
    });
    it('id empty', async () => {
      const userDao = new UserPersistDto();
      userDao.id = '';
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator: 'id: invalid uuid value.',
      });
    });
    it('id not uuid value', async () => {
      const userDao = new UserPersistDto();
      userDao.id = 'anyValue';
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator: 'id: invalid uuid value.',
      });
    });
  });

  describe('validate name', () => {
    it('name null', async () => {
      const userDao = new UserPersistDto();
      userDao.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator: 'name: is required.',
      });
    });
    it('name empty', async () => {
      const userDao = new UserPersistDto();
      userDao.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      userDao.name = '';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        domainValidator: 'name: should not be empty.',
      });
    });
  });
});
