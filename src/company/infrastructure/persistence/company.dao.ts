import { Company } from '../../domain/company';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddressStreet } from '../../domain/company-address/company-address-street';
import { CompanyAddressNumber } from '../../domain/company-address/company-address-number';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';
import { CompanyAddress } from '../../domain/company-address/company-address';

export class CompanyDao {
  id: string;
  name: string;
  addressStreet: string;
  addressNumber: number;

  static fromAggregate(company: Company): CompanyDao {
    const dao = new CompanyDao();
    dao.id = company.id.value;
    dao.name = company.name.value;
    dao.addressStreet = company.address.street.value;
    dao.addressNumber = company.address.number.value;
    return dao;
  }

  static fromItem(item: ItemDto): CompanyDao {
    const dao = new CompanyDao();
    //item.data.id = item.id
    dao.id = item.data.id;
    dao.name = item.data.name;
    dao.addressStreet = item.data.addressStreet;
    dao.addressNumber = item.data.addressNumber;
    return dao;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      addressStreet: this.addressStreet,
      addressNumber: this.addressNumber,
    };
  }

  toAggregate(): Company {
    return new Company(
      new CompanyId(this.id),
      new CompanyName(this.name),
      new CompanyAddress(new CompanyAddressNumber(this.addressNumber), new CompanyAddressStreet(this.addressStreet)),
    );
  }
}
