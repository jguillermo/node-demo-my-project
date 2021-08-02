import { Validate } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';
import { DomainValidator } from '../../../share/domain/domain.validator';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';

@InputType('UserPersistInput')
export class UserPersistDao extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;

  @Validate(DomainValidator, [UserName])
  @Field()
  name: string;
}
