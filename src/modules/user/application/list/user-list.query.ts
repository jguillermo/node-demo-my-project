import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Field, Float, InputType } from '@nestjs/graphql';
import { CqBaseDto } from '../../../share/application/cq-base.dto';

@InputType('UserListInput')
export class UserListQuery extends CqBaseDto {
  constructor() {
    super();
  }

  @IsOptional()
  @IsString()
  @Field()
  id: string;

  @IsOptional()
  @IsString()
  @Field()
  name: string;
}
