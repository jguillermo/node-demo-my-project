import { EventBase } from 'base-ddd';

export class CompanyUpdatedEvent extends EventBase {
  constructor(
    private _id: string,
    private _name: string,
    private _addressStreet: string,
    private _addressNumber: number,
  ) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get addressStreet(): string {
    return this._addressStreet;
  }

  get addressNumber(): number {
    return this._addressNumber;
  }

  eventName(): string {
    return 'company.updated';
  }
}
