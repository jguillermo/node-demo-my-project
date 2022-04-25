import { after, before, binding, given, then, when } from 'cucumber-tsflow';
import { INestApplication } from '@nestjs/common';
import { CompanyRepository } from '../../src/company/domain/company.repository';
import { CompanyBDDModule } from './company-e2e-module';
import * as pactum from 'pactum';
import * as Spec from 'pactum/src/models/Spec';
import { toJson } from './tools/string-tools';

@binding()
export class RequestSteps {
  private app: INestApplication;
  private repository: CompanyRepository;
  private _playload: string;
  private spec: Spec;

  @before()
  public async beforeAllScenarios() {
    ({ app: this.app, companyRepository: this.repository } = await CompanyBDDModule.create());
    const items = await this.repository.findAll();
    for await (const item of items) {
      await this.repository.deleteById(item.id);
    }
    this.spec = pactum.spec();
    this._playload = '';
  }

  @after()
  public async afterAllScenarios() {
    await this.app.close();
  }

  @given('I have the following payload')
  public i_have_the_following_payload(payload: string) {
    this._playload = payload;
  }

  @when('I make a request to graphql')
  public i_make_a_request_to_graphql() {
    this.spec.post(CompanyBDDModule.url).withGraphQLQuery(this._playload);
  }

  @when('I validate the response is')
  public async i_validate_the_response_is(response: string) {
    const responseJson = toJson(response);

    await this.spec.expectJson(responseJson);
  }

  @then('response should have a status {int}')
  public i_get_a_status_code_response(statusCode: number) {
    this.spec.response().should.have.status(statusCode);
  }
}
