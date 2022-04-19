import { CompanyRepository } from '../../../domain/company.repository';
import { CompanyId } from '../../../domain/company-id';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Company } from '../../../domain/company';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CompanyDao } from './company.dao';

@Injectable()
export class CompanyTypeOrmRepository extends Repository<CompanyDao> {}

@Injectable()
export class CompanyPostgresRepository extends CompanyRepository {
  constructor(private repository: CompanyTypeOrmRepository) {
    super();
  }

  async persist(company: Company): Promise<void> {
    const dao = CompanyDao.fromAggregate(company);
    await this.repository.insert(dao);
  }

  async findById(id: CompanyId): Promise<Company | null> {
    const dao = await this.repository.findOneBy({ id: id.value });
    if (!dao) {
      return null;
    }
    return dao.toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Company[]> {
    // if (!Array.isArray(filters)) {
    //   filters = [];
    // }
    // if (!paginator) {
    //   paginator = PaginatorTypeImp.empty();
    // }
    // if (!order) {
    //   order = OrderTypeImp.empty();
    // }
    //
    // const daos = await this.repository.findBy({
    //
    // });
    // return daos.map((dao) => {
    //   return dao.toAggregate();
    // });

    return [];
  }

  async deleteById(id: CompanyId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
