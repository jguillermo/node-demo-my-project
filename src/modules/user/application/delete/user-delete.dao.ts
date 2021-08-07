import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { UserId } from '../../domain/user-id';
import { DomainValidator } from 'base-ddd';
import { BaseDao } from '../../../share/application/base.dao';

@ArgsType()
export class UserDeleteDao extends BaseDao {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;
}
