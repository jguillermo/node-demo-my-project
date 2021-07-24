import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';

@InputType('UserFindByIdInput')
export class UserFindByIdQuery extends BaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
