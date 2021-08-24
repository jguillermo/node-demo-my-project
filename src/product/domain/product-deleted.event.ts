import { EventBase } from 'base-ddd';

export class ProductDeletedEvent extends EventBase {
  constructor(
    private _id: string,
    private _name: string,
    private _code: string,
    private _description: string,
    private _createAt: date,
    private _price: number,
    private _category: string,
  ) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get description(): string {
    return this._description;
  }

  get createAt(): date {
    return this._createAt;
  }

  get price(): number {
    return this._price;
  }

  get category(): string {
    return this._category;
  }

  eventName(): string {
    return 'product.deleted';
  }
}
