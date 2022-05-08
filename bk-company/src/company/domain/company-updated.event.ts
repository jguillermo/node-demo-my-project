import { EventBase } from 'base-ddd';
import { CompanyAddressMap } from './company-address';

export class CompanyUpdatedEvent extends EventBase {
  constructor(private _id: string, private _name: string, private _address: CompanyAddressMap) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): CompanyAddressMap {
    return this._address;
  }

  eventName(): string {
    return 'company.updated';
  }
}
