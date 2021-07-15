import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { CqBaseDto } from '../../../share/application/cq-base.dto';

@InputType('UserFindByIdInput')
export class UserFindByIdQuery extends CqBaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;
}
