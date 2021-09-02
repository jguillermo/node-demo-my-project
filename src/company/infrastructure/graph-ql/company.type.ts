import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../../share/app/status.type';

@ObjectType('Company')
export class CompanyType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  addressStreet: string;

  @Field()
  addressNumber: number;
}

export const ResultCompanyPersist = createUnionType({
  name: 'ResultCompanyPersist',
  types: () => [CompanyType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return CompanyType;
  },
});
