import { ValidatorInterface } from 'base-ddd';
import { CompanyAddressNumber } from './company-address-number';
import { CompanyAddressStreet } from './company-address-street';

export class CompanyAddress implements ValidatorInterface {
  constructor(private _number: CompanyAddressNumber, private _street: CompanyAddressStreet) {}

  static create(data: any) {
    return new CompanyAddress(new CompanyAddressNumber(data?.number), new CompanyAddressStreet(data?.street));
  }

  get number(): CompanyAddressNumber {
    return this._number;
  }

  get street(): CompanyAddressStreet {
    return this._street;
  }

  isValid(): boolean {
    this._number.isValid();
    this._street.isValid();
    return true;
  }

  validatorMessage(): string {
    return 'CompanyAddress is not valid.';
  }
}
