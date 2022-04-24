import { after, before, binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import { INestApplication } from '@nestjs/common';
import { CompanyRepository } from '../../src/company/domain/company.repository';
import { CompanyBDDModule } from './company-e2e-module';

@binding()
export class RequestSteps {
  private app: INestApplication;
  private repository: CompanyRepository;

  @before()
  public async beforeAllScenarios() {
    ({ app: this.app, companyRepository: this.repository } = await CompanyBDDModule.create());
    const items = await this.repository.findAll();
    for await (const item of items) {
      await this.repository.deleteById(item.id);
    }
    console.log(CompanyBDDModule.url);
  }

  @after()
  public async afterAllScenarios() {
    await this.app.close();
  }

  private accountBalance = 0;

  @given('I have the following payload')
  public i_have_the_following_payload(payload: string) {
    console.log(payload);
  }

  @when('I make a request to graphql')
  public i_make_a_request_to_graphql() {
    console.log('request graphQl');
  }

  @when('I validate the response is')
  public i_validate_the_response_is(response: string) {
    console.log(response);
  }

  @then('I get a SUCCESSFUL response')
  public i_get_a_status_code_response() {
    console.log('response success');
  }

  @then('I validate the following data exists on collection Company')
  public i_validate_the_following_data_exists_on_collection(data: string) {
    console.log('validate data:' + data);
  }
}
