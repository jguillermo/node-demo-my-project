import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultCompanyPersist, CompanyType } from './company.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../../../src/context/share/application/applicationResponse';
import { StatusType } from '../../../../../src/context/share/app/status.type';
import { CompanyFindByIdDto } from '../../application/find-by-id/company-find-by-id.dto';
import { CompanyPersistDto } from '../../application/persist/company-persist.dto';
import { CompanyDeleteDto } from '../../application/delete/company-delete.dto';
import { CompanyListDto } from '../../application/list/company-list.dto';
import { CompanyResponse } from '../../application/company.response';
import { ListCompanyResponse } from '../../application/list-company.response';

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [CompanyType], { name: 'companyList' })
  async list(@Args() args: CompanyListDto): Promise<CompanyResponse[]> {
    const data: ListCompanyResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @Query(() => CompanyType, { name: 'company', nullable: true })
  async aggregate(@Args() args: CompanyFindByIdDto): Promise<CompanyResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultCompanyPersist, { name: 'companyPersist' })
  async persist(@Args() args: CompanyPersistDto) {
    await this.commandBus.execute(args);
    return args.showEntity ? await this.queryBus.execute(new CompanyFindByIdDto(args.id)) : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'companyDelete' })
  async delete(@Args() args: CompanyDeleteDto): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
