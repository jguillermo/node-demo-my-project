import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../../../src/context/share/application/base.dto';
import { CompanyId } from '../../domain/company-id';

@ArgsType()
export class CompanyFindByIdDto extends BaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @Validate(DomainValidator, [CompanyId])
  @Field()
  id: string;
}
