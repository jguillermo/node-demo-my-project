import { IsOptional, IsString, Validate } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import { OrderDao, PaginatorDao } from '../../../share/application/filter.dto';
import { DomainValidator } from '../../../share/domain/domain.validator';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';

@InputType('UserListInput')
export class UserListDao extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UUIDTypeImp])
  @Field({ nullable: true })
  id?: string;

  @Validate(DomainValidator, [StringTypeImp])
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => PaginatorDao, { nullable: true })
  paginator?: PaginatorDao;

  @IsOptional()
  @Field(() => OrderDao, { nullable: true })
  order?: OrderDao;
}
