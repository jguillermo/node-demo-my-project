import { Product } from '../../../domain/product';
import { ProductId } from '../../../domain/product-id';
import { ProductName } from '../../../domain/product-name';
import { ProductCode } from '../../../domain/product-code';
import { ProductDescription } from '../../../domain/product-description';
import { ProductCreateAt } from '../../../domain/product-create-at';
import { ProductPrice } from '../../../domain/product-price';
import { ProductCategory } from '../../../domain/product-category';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductDao {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  createAt: Date;

  @Column()
  price: number;

  @Column()
  category: string;

  static fromAggregate(product: Product): ProductDao {
    const dao = new ProductDao();
    dao.id = product.id.value;
    dao.name = product.name.value;
    dao.code = product.code.value;
    dao.description = product.description.value;
    dao.createAt = product.createAt.value;
    dao.price = product.price.value;
    dao.category = product.category.value;
    return dao;
  }

  toAggregate(): Product {
    return new Product(
      new ProductId(this.id),
      new ProductName(this.name),
      new ProductCode(this.code),
      new ProductDescription(this.description),
      new ProductCreateAt(this.createAt),
      new ProductPrice(this.price),
      new ProductCategory(this.category),
    );
  }
}
