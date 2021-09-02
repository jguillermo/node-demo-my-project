import { StringType, ValidatorInterface } from 'base-ddd';
import { CompanyAddressNumber } from './company-address-number';
import { CompanyAddressStreet } from './company-address-street';

export class CompanyAddress implements ValidatorInterface {
  constructor(private _number: CompanyAddressNumber, private _street: CompanyAddressStreet) {}

  get number(): CompanyAddressNumber {
    return this._number;
  }

  get street(): CompanyAddressStreet {
    return this._street;
  }

  isValid(): boolean {
    return this._number.isValid() && this._street.isValid();
  }

  validatorMessage(): string {
    return 'value ($value) is not valid.';
  }
}
