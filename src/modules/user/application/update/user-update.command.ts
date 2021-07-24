import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { BaseDto } from '../../../share/application/base.dto';

@InputType('UserUpdateInput')
export class UserUpdateCommand extends BaseDto {
  constructor() {
    super();
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
