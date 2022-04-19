import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDao } from './product.dao';
import { Product } from '../../../domain/product';
import { ProductId } from '../../../domain/product-id';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';

@Injectable()
export class ProductPostgresRepository extends ProductRepository {
  constructor(
    @InjectRepository(ProductDao)
    private repository: Repository<ProductDao>,
  ) {
    super();
  }

  async persist(product: Product): Promise<void> {
    const dao = ProductDao.fromAggregate(product);
    await this.repository.save(dao);
  }

  async findById(id: ProductId): Promise<Product | null> {
    const dao = await this.repository.findOne({ where: { id: id.value } });
    if (!dao) {
      return null;
    }
    return dao.toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Product[]> {
    return [];
  }

  async deleteById(id: ProductId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
