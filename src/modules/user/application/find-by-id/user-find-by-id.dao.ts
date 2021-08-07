import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import { UserId } from '../../domain/user-id';
import { DomainValidator } from 'base-ddd';

@ArgsType()
export class UserFindByIdDao extends BaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;
}
