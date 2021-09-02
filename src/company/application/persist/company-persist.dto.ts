import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddressStreet } from '../../domain/company-address-street';
import { CompanyAddressNumber } from '../../domain/company-address-number';

@ArgsType()
export class CompanyPersistDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [CompanyId])
  @Field()
  id: string;

  @Validate(DomainValidator, [CompanyName])
  @Field()
  name: string;

  @Validate(DomainValidator, [CompanyAddressStreet])
  @Field()
  addressStreet: string;

  @Validate(DomainValidator, [CompanyAddressNumber])
  @Field()
  addressNumber: number;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
