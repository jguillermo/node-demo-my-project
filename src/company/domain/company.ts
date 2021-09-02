import { AggregateRoot } from 'base-ddd';
import { CompanyId } from './company-id';
import { CompanyName } from './company-name';
import { CompanyAddressStreet } from './company-address-street';
import { CompanyAddressNumber } from './company-address-number';
import { CompanyCreatedEvent } from './company-created.event';
import { CompanyUpdatedEvent } from './company-updated.event';
import { CompanyDeletedEvent } from './company-deleted.event';

export class Company extends AggregateRoot {
  constructor(
    private _id: CompanyId,
    private _name: CompanyName,
    private _addressStreet: CompanyAddressStreet,
    private _addressNumber: CompanyAddressNumber,
  ) {
    super();
  }

  static create(
    id: CompanyId,
    name: CompanyName,
    addressStreet: CompanyAddressStreet,
    addressNumber: CompanyAddressNumber,
  ): Company {
    const company = new Company(id, name, addressStreet, addressNumber);
    company.record(new CompanyCreatedEvent(id.value, name.value, addressStreet.value, addressNumber.value));
    return company;
  }

  get id(): CompanyId {
    return this._id;
  }

  get name(): CompanyName {
    return this._name;
  }

  get addressStreet(): CompanyAddressStreet {
    return this._addressStreet;
  }

  get addressNumber(): CompanyAddressNumber {
    return this._addressNumber;
  }

  update(name: CompanyName, addressStreet: CompanyAddressStreet, addressNumber: CompanyAddressNumber): void {
    this._name = name;
    this._addressStreet = addressStreet;
    this._addressNumber = addressNumber;
    this.record(
      new CompanyUpdatedEvent(this.id.value, this.name.value, this.addressStreet.value, this.addressNumber.value),
    );
  }

  delete(): void {
    this.record(
      new CompanyDeletedEvent(this.id.value, this.name.value, this.addressStreet.value, this.addressNumber.value),
    );
  }
}
