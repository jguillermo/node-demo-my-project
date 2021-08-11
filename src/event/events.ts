import { UserCreated } from './user/user-created';
import { UserUpdated } from './user/user-updated';
import { UserDeleted } from './user/user-deleted';

export const AppEvents = [UserCreated, UserUpdated, UserDeleted];
