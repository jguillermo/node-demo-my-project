import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';

@binding()
export class BankAccountSteps {
  private accountBalance = 0;

  @given('A bank account with starting balance of ${int}')
  public givenAnAccountWithStartingBalance(amount: number) {
    this.accountBalance = amount;
  }

  @when('${int} is deposited')
  public deposit(amount: number) {
    this.accountBalance = Number(this.accountBalance) + Number(amount);
  }

  @then('The bank account balance should be ${int}')
  public accountBalanceShouldEqual(expectedAmount: number) {
    assert.equal(this.accountBalance, expectedAmount);
  }
}
