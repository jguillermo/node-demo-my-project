import { IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import { OrderDao, PaginatorDao } from '../../../share/application/filter.dto';

@InputType('UserListInput')
export class UserListDao extends BaseDto {
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
  @Field(() => PaginatorDao, { nullable: true })
  paginator?: PaginatorDao;

  @IsOptional()
  @Field(() => OrderDao, { nullable: true })
  order?: OrderDao;
}
