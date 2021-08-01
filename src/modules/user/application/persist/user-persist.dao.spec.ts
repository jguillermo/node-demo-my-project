import { validate } from 'class-validator';
import { UserPersistDao } from './user-persist.dao';

describe('User dao', () => {
  describe('validate', () => {
    it('get empty', async () => {
      const userDao = new UserPersistDao();
      userDao.id = '654';
      userDao.name = 'name';
      const errors = await validate(userDao);
      //console.log(errors);
      expect(errors.length).toEqual(0);
    });
  });
});
