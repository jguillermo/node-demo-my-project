import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CqBaseDto } from '../../../share/application/cq-base.dto';

@InputType('UserCreateInput')
export class UserCreateCommand extends CqBaseDto {
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
