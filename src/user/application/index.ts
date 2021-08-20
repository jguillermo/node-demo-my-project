import { UserPersistHandler } from './persist/user-persist.handler';
import { UserDeleteHandler } from './delete/user-delete.handler';
import { UserListHandler } from './list/user-list.handler';
import { UserFindByIdHandler } from './find-by-id/user-find-by-id.handler';
import { UserPersistService } from './persist/user-persist.service';
import { UserListService } from './list/user-list.service';
import { UserFindByIdService } from './find-by-id/user-find-by-id.service';
import { UserDeleteService } from './delete/user-delete.service';

export const ApplicationHandlers = [UserListHandler, UserFindByIdHandler, UserPersistHandler, UserDeleteHandler];
export const ApplicationServices = [UserPersistService, UserListService, UserFindByIdService, UserDeleteService];
