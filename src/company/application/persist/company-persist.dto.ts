import { Validate, IsOptional, ValidateNested } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { CompanyId } from '../../domain/company-id';
import { CompanyName } from '../../domain/company-name';
import { CompanyAddress } from '../../domain/company-address/company-address';
import { CompanyAddressStreet } from '../../domain/company-address/company-address-street';
import { CompanyAddressNumber } from '../../domain/company-address/company-address-number';
import { Type } from 'class-transformer';

@InputType('CompanyAddressCreateInput')
class CompanyAddressCreateInput {
  @Validate(DomainValidator, [CompanyAddressStreet])
  @Field()
  street: string;

  @Validate(DomainValidator, [CompanyAddressNumber])
  @Field()
  number: number;
}

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

  @ValidateNested()
  @Type(() => CompanyAddressCreateInput)
  @Validate(DomainValidator, [CompanyAddress])
  @Field(() => CompanyAddressCreateInput)
  address: CompanyAddressCreateInput;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
