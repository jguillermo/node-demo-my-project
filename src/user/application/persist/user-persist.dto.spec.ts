import { validate } from 'class-validator';
import { UserPersistDto } from './user-persist.dto';

describe('UserPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new UserPersistDto();
      dto.id = '1dc7ceb2-a619-47e0-b350-f909f699acd2';
      dto.name = 'name';
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new UserPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(2);
      //console.log(errors);
    });
  });
});
