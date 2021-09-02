import { CompanyDeleteHandler } from './delete/company-delete.handler';
import { CompanyFindByIdHandler } from './find-by-id/company-find-by-id.handler';
import { CompanyListHandler } from './list/company-list.handler';
import { CompanyPersistHandler } from './persist/company-persist.handler';
import { CompanyDeleteService } from './delete/company-delete.service';
import { CompanyFindByIdService } from './find-by-id/company-find-by-id.service';
import { CompanyListService } from './list/company-list.service';
import { CompanyPersistService } from './persist/company-persist.service';

export const ApplicationHandlers = [
  CompanyDeleteHandler,
  CompanyFindByIdHandler,
  CompanyListHandler,
  CompanyPersistHandler,
];
export const ApplicationServices = [
  CompanyDeleteService,
  CompanyFindByIdService,
  CompanyListService,
  CompanyPersistService,
];
