import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../../../../src/context/share/app/status.type';

@ObjectType('CompanyAddress')
class CompanyAddressType {
  @Field()
  street: string;

  @Field()
  number: number;
}

@ObjectType('Company')
export class CompanyType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => CompanyAddressType)
  address: CompanyAddressType;
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
