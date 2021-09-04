import { validate } from 'class-validator';
import { CompanyPersistDto } from './company-persist.dto';

describe('CompanyPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new CompanyPersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.name = 'name';
      dto.address = {
        street: 'street',
        number: 12.5,
      };
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new CompanyPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(3);
    });
  });
});
