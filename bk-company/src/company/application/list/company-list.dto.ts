import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, Validate } from 'class-validator';
import { DomainValidator, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { BaseDto, OrderDto, PaginatorDto } from '../../../../../src/share/application/base.dto';
import { Type } from 'class-transformer';

@InputType('CompanyAddressListInput')
class CompanyAddressListInput {
  @IsOptional()
  @Field({ nullable: true })
  street?: string;

  @IsOptional()
  @Field({ nullable: true })
  number?: number;
}

@ArgsType()
export class CompanyListDto extends BaseDto {
  constructor() {
    super();
  }

  @IsOptional()
  @Field({ nullable: true })
  id?: string;

  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Type(() => CompanyAddressListInput)
  @Field(() => CompanyAddressListInput, { nullable: true })
  address: CompanyAddressListInput;

  @IsOptional()
  @Validate(DomainValidator, [PaginatorTypeImp])
  @Field(() => PaginatorDto, { nullable: true })
  paginator?: PaginatorDto;

  @IsOptional()
  @Validate(DomainValidator, [OrderTypeImp])
  @Field(() => OrderDto, { nullable: true })
  order?: OrderDto;
}
