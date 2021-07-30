import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';

export class OrderType {
  constructor(
    private _orderBy: StringTypeImp,
    private _direction: StringTypeImp,
  ) {}

  static create(orderBy: string | undefined, direction: string | undefined) {
    return new OrderType(
      new StringTypeImp(orderBy),
      new StringTypeImp(direction),
    );
  }

  static empty() {
    return new OrderType(new StringTypeImp(null), new StringTypeImp(null));
  }

  get orderBy(): StringTypeImp {
    return this._orderBy;
  }

  get direction(): StringTypeImp {
    return this._direction;
  }
}
