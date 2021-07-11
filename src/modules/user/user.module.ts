import { Module } from '@nestjs/common';
import { UserFirestoreRepository } from './infrastructure/persistence/user-firestore.repository';

@Module({
  providers: [UserFirestoreRepository],
})
export class UserModule {}
