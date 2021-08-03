import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import { DomainValidator } from '../../../share/domain/domain.validator';
import { UserId } from '../../domain/user-id';

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
