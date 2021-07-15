import { InputType } from '@nestjs/graphql';
import { CqBaseDto } from '../../../share/application/cq-base.dto';

@InputType('UserFindAllInput')
export class UserFindAllQuery extends CqBaseDto {
  constructor() {
    super();
  }
}
