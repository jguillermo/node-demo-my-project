import { Company } from '../../../domain/company';
import { CompanyId } from '../../../domain/company-id';
import { CompanyName } from '../../../domain/company-name';
import { CompanyAddress } from '../../../domain/company-address';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CompanyDao {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  addressStreet: string;

  @Column()
  addressNumber: number;

  static fromAggregate(company: Company): CompanyDao {
    const dao = new CompanyDao();
    dao.id = company.id.value;
    dao.name = company.name.value;
    dao.addressStreet = company.address.street.value;
    dao.addressNumber = company.address.number.value;
    return dao;
  }

  toAggregate(): Company {
    return new Company(
      new CompanyId(this.id),
      new CompanyName(this.name),
      new CompanyAddress({
        number: this.addressNumber,
        street: this.addressStreet,
      }),
    );
  }
}
