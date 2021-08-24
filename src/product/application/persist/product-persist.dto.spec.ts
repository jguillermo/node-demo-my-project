import { validate } from 'class-validator';
import { ProductPersistDto } from './product-persist.dto';

describe('ProductPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new ProductPersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.name = 'name';
      dto.code = WIP;
      dto.description = 'description';
      dto.createAt = WIP;
      dto.price = WIP;
      dto.category = WIP;
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new ProductPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(7);
      //console.log(errors);
    });
  });
});
