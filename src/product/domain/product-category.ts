import { EnumType } from 'base-ddd';

enum EnumProductCategory {
  CAT1 = 'cat1',
  CAT2 = 'cat2',
}

export class ProductCategory extends EnumType<string> {
  protected _enum = EnumProductCategory;
  get enum() {
    return this._enum;
  }

  protected enumValues(): string[] {
    return Object.keys(EnumProductCategory);
  }
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }
}
