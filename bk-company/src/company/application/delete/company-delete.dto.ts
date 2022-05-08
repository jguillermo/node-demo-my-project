import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../../../src/share/application/base.dto';
import { CompanyId } from '../../domain/company-id';

@ArgsType()
export class CompanyDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [CompanyId])
  @Field()
  id: string;
}
