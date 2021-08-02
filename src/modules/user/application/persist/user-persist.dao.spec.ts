import { validate } from 'class-validator';
import { UserPersistDao } from './user-persist.dao';

describe('User dao', () => {
  describe('validate ok', () => {
    it('all correct', async () => {
      const userDao = new UserPersistDao();
      userDao.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(0);
    });
  });
  describe('validate id', () => {
    it('id null', async () => {
      const userDao = new UserPersistDao();
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        customText: 'Error: Id is required',
      });
    });
    it('id empty', async () => {
      const userDao = new UserPersistDao();
      userDao.id = '';
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        customText: 'Error: Invalid uuid value',
      });
    });
    it('id not uuid value', async () => {
      const userDao = new UserPersistDao();
      userDao.id = 'anyValue';
      userDao.name = 'name';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        customText: 'Error: Invalid uuid value',
      });
    });
  });

  describe('validate name', () => {
    it('name null', async () => {
      const userDao = new UserPersistDao();
      userDao.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        customText: 'Error: name is required',
      });
    });
    it('name empty', async () => {
      const userDao = new UserPersistDao();
      userDao.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      userDao.name = '';
      const errors = await validate(userDao);
      expect(errors.length).toEqual(1);
      expect(errors[0].constraints).toEqual({
        customText: 'Error: name should not be empty',
      });
    });
  });
});
