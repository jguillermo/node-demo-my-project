import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';

@InputType('UserDeleteInput')
export class UserDeleteCommand extends BaseDto {
  constructor() {
    super();
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
