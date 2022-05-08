import { ValidatorInterface } from 'base-ddd';
import { CompanyAddressNumber } from './company-address-number';
import { CompanyAddressStreet } from './company-address-street';

export interface CompanyAddressMap {
  street: string;
  number: number;
}

export class CompanyAddress implements ValidatorInterface {
  private readonly _number: CompanyAddressNumber;
  private readonly _street: CompanyAddressStreet;

  constructor(data: any) {
    this._number = new CompanyAddressNumber(data?.number);
    this._street = new CompanyAddressStreet(data?.street);
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

  get value(): CompanyAddressMap {
    return {
      number: this.number.value,
      street: this.street.value,
    };
  }

  validatorMessage(): string {
    return 'CompanyAddress is not valid.';
  }
}
