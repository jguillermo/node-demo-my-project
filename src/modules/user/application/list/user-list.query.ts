import { IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import {
  OrderInput,
  PaginatorInput,
} from '../../../share/application/filter.input';

@InputType('UserListInput')
export class UserListQuery extends BaseDto {
  constructor() {
    super();
  }

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => PaginatorInput, { nullable: true })
  paginator?: PaginatorInput;

  @IsOptional()
  @Field(() => OrderInput, { nullable: true })
  order?: OrderInput;
}
