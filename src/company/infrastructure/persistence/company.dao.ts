import { Company } from '../../domain/company';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';
import { CompanyAddress } from '../../domain/company-address/company-address';

class CompanyAddressDao {
  street: string;
  number: number;
}

export class CompanyDao {
  id: string;
  name: string;
  address: CompanyAddressDao;

  static fromAggregate(company: Company): CompanyDao {
    const dao = new CompanyDao();
    dao.id = company.id.value;
    dao.name = company.name.value;
    dao.address = {
      street: company.address.street.value,
      number: company.address.number.value,
    };
    return dao;
  }

  static fromItem(item: ItemDto): CompanyDao {
    const dao = new CompanyDao();
    //item.data.id = item.id
    dao.id = item.data.id;
    dao.name = item.data.name;
    dao.address = {
      street: item.data.addressStreet,
      number: item.data.addressNumber,
    };
    return dao;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      addressStreet: this.address.street,
      addressNumber: this.address.number,
    };
  }

  toAggregate(): Company {
    return new Company(new CompanyId(this.id), new CompanyName(this.name), CompanyAddress.create(this.address));
  }
}