import { AggregateRoot } from 'base-ddd';
import { CompanyId } from './company-id';
import { CompanyName } from './company-name';
import { CompanyCreatedEvent } from './company-created.event';
import { CompanyUpdatedEvent } from './company-updated.event';
import { CompanyDeletedEvent } from './company-deleted.event';
import { CompanyAddress } from './company-address';

export class Company extends AggregateRoot {
  constructor(private _id: CompanyId, private _name: CompanyName, private _address: CompanyAddress) {
    super();
  }

  static create(id: CompanyId, name: CompanyName, address: CompanyAddress): Company {
    const company = new Company(id, name, address);
    company.record(new CompanyCreatedEvent(id.value, name.value, address.street.value, address.number.value));
    return company;
  }

  get id(): CompanyId {
    return this._id;
  }

  get name(): CompanyName {
    return this._name;
  }

  get address(): CompanyAddress {
    return this._address;
  }

  update(name: CompanyName, address: CompanyAddress): void {
    this._name = name;
    this._address = address;
    this.record(
      new CompanyUpdatedEvent(this.id.value, this.name.value, this.address.street.value, this.address.number.value),
    );
  }

  delete(): void {
    this.record(
      new CompanyDeletedEvent(this.id.value, this.name.value, this.address.street.value, this.address.number.value),
    );
  }
}
