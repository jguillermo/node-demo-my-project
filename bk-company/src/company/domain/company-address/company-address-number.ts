import { NumberType } from 'base-ddd';

export class CompanyAddressNumber extends NumberType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    if (this.value === 151) {
      throw new Error('error not 151');
    }
    return true;
  }
}
