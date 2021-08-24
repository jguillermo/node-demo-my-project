import { EnumType } from 'base-ddd';

enum EnumProductCategory {
  UP = 'UP',
  DOWN = 'DOWN',
}

export class ProductCategory extends EnumType<string> {
  protected _enum = EnumProductCategory;
  get enum() {
    return this._enum;
  }

  protected enumValues(): string[] {
    return Object.keys(EnumProductCategory);
  }
}
