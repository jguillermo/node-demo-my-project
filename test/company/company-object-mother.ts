import { faker } from '@faker-js/faker';
import { Company } from '../../src/company/domain/company';
import { CompanyId } from '../../src/company/domain/company-id';
import { CompanyName } from '../../src/company/domain/company-name';
import { CompanyAddress } from '../../src/company/domain/company-address';

export interface CompanyAddressDataInterface {
  street?: string;
  number?: number;
}

export interface CompanyDataInterface {
  id?: string;
  name?: string;
  address?: CompanyAddressDataInterface;
}

export class CompanyIdMother {
  static create(value?: string): CompanyId {
    const id = value ? value : faker.datatype.uuid();
    return new CompanyId(id);
  }
}

export class CompanyNameMother {
  static create(value?: string): CompanyName {
    const name = value ? value : faker.name.firstName();
    return new CompanyName(name);
  }
}

export class CompanyAddressMother {
  static create(value?: CompanyAddressDataInterface): CompanyAddress {
    const data = {
      street: value?.street ? value.street : faker.random.word(),
      number: value?.number ? value.number : faker.datatype.number(),
    };
    return new CompanyAddress(data);
  }
}

export class CompanyMother {
  static create(data?: CompanyDataInterface): Company {
    return new Company(
      CompanyIdMother.create(data?.id),
      CompanyNameMother.create(data?.name),
      CompanyAddressMother.create(data?.address),
    );
  }
}
