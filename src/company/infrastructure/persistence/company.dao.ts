import { Company } from '../../domain/company';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddressStreet } from '../../domain/company-address-street';
import { CompanyAddressNumber } from '../../domain/company-address-number';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';

export class CompanyDao {
  id: string;
  name: string;
  addressStreet: string;
  addressNumber: number;

  static fromAggregate(company: Company): CompanyDao {
    const dao = new CompanyDao();
    dao.id = company.id.value;
    dao.name = company.name.value;
    dao.addressStreet = company.addressStreet.value;
    dao.addressNumber = company.addressNumber.value;
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
      new CompanyAddressStreet(this.addressStreet),
      new CompanyAddressNumber(this.addressNumber),
    );
  }
}
