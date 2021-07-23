import { IsOptional } from 'class-validator';

export abstract class BaseDto {
  @IsOptional()
  public _transactionId: string;

  protected constructor(transactionId: string = null) {
    this.transactionId = transactionId;
  }

  set transactionId(value: string) {
    this._transactionId = value;
  }
}
