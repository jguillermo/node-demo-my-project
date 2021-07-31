import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';

export class OrderType {
  constructor(
    private _field: StringTypeImp,
    private _direction: StringTypeImp,
  ) {}

  static create(field: string | undefined, direction: string | undefined) {
    return new OrderType(
      new StringTypeImp(field),
      new StringTypeImp(direction),
    );
  }

  static empty() {
    return new OrderType(new StringTypeImp(null), new StringTypeImp(null));
  }

  get field(): StringTypeImp {
    return this._field;
  }

  get direction(): StringTypeImp {
    return this._direction;
  }

  isEmpty() {
    return this._field.isNull && this._direction.isNull;
  }
}
