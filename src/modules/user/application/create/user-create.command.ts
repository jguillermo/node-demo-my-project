import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';

@InputType('UserCreateInput')
export class UserCreateCommand extends BaseDto {
  constructor() {
    super();
  }

  @IsOptional()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
