import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';

@InputType('UserPersistInput')
export class UserPersistCommand extends BaseDto {
  constructor() {
    super();
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
