import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';

export class PaginatorType {
  constructor(private _page: NumberTypeImp, private _perPage: NumberTypeImp) {}

  static create(page: number | undefined, perPage: number | undefined) {
    return new PaginatorType(
      new NumberTypeImp(page),
      new NumberTypeImp(perPage),
    );
  }

  static empty() {
    return new PaginatorType(new NumberTypeImp(null), new NumberTypeImp(null));
  }

  get page(): NumberTypeImp {
    return this._page;
  }

  get perPage(): NumberTypeImp {
    return this._perPage;
  }
}
