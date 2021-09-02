import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Company } from './company';
import { CompanyId } from './company-id';

export abstract class CompanyRepository {
  abstract persist(company: Company): Promise<void>;

  abstract findById(id: CompanyId): Promise<Company | null>;

  abstract findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Company[]>;

  abstract deleteById(id: CompanyId): Promise<void>;
}
