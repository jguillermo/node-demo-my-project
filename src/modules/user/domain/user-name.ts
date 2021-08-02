import { StringType } from 'base-ddd';

export class UserName extends StringType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('name is required');
    }
    if (this.isEmpty) {
      throw new Error('name should not be empty');
    }
    return true;
  }
}
