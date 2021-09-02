import * as faker from 'faker';
import { Company } from '../../src/company/domain/company';
import { CompanyId } from '../../src/company/domain/company-id';
import { CompanyName } from '../../src/company/domain/company-name';
import { CompanyAddressStreet } from '../../src/company/domain/company-address/company-address-street';
import { CompanyAddressNumber } from '../../src/company/domain/company-address/company-address-number';
import { CompanyAddress } from '../../src/company/domain/company-address/company-address';

export interface CompanyDataInterface {
  id?: string;
  name?: string;
  addressStreet?: string;
  addressNumber?: number;
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

export class CompanyAddressStreetMother {
  static create(value?: string): CompanyAddressStreet {
    const addressStreet = value ? value : faker.random.word();
    return new CompanyAddressStreet(addressStreet);
  }
}

export class CompanyAddressNumberMother {
  static create(value?: number): CompanyAddressNumber {
    const addressNumber = value ? value : faker.datatype.number();
    return new CompanyAddressNumber(addressNumber);
  }
}

export class CompanyAddressMother {
  static create(data?: CompanyDataInterface): CompanyAddress {
    return new CompanyAddress(
      CompanyAddressNumberMother.create(data?.addressNumber),
      CompanyAddressStreetMother.create(data?.addressStreet),
    );
  }
}

export class CompanyMother {
  static create(data?: CompanyDataInterface): Company {
    return new Company(
      CompanyIdMother.create(data?.id),
      CompanyNameMother.create(data?.name),
      CompanyAddressMother.create(data),
    );
  }
}
