import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../../share/app/status.type';

@ObjectType('Product')
export class ProductType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  description: string;

  @Field()
  createAt: date;

  @Field()
  price: number;

  @Field()
  category: string;
}

export const ResultProductPersist = createUnionType({
  name: 'ResultProductPersist',
  types: () => [ProductType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return ProductType;
  },
});
