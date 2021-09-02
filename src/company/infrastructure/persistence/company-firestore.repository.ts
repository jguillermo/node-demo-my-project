import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Company } from '../../domain/company';
import { CompanyId } from '../../domain/company-id';
import { CompanyDao } from './company.dao';
import { CompanyRepository } from '../../domain/company.repository';
import { FirestoreService } from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class CompanyFirestoreRepository extends CompanyRepository {
  private _collection = 'companies';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(company: Company): Promise<void> {
    const dao = CompanyDao.fromAggregate(company);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: CompanyId): Promise<Company | null> {
    const item = await this.firestore.findOneDocumentById(this._collection, id.value);
    if (!item) {
      return null;
    }
    return CompanyDao.fromItem(item).toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Company[]> {
    if (!Array.isArray(filters)) {
      filters = [];
    }
    if (!paginator) {
      paginator = PaginatorTypeImp.empty();
    }
    if (!order) {
      order = OrderTypeImp.empty();
    }
    const items = await this.firestore.findAll(
      this._collection,
      filters.filter((e) => e.value),
      paginator,
      order,
    );
    return items.map((item) => {
      return CompanyDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: CompanyId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
