import { Firebase } from '../../../share/infrastructure/firebase';
import { BaseFirestoreRepository } from 'fireorm/lib/src/BaseFirestoreRepository';
import { getRepository } from 'fireorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserId } from '../../domain/user-id';
import { UserDao } from './user.dao';
import { UserRepository } from '../../domain/user.repository';

@Injectable()
export class UserFirestoreRepository extends UserRepository {
  private repository: BaseFirestoreRepository<UserDao>;

  constructor() {
    super();
    Firebase.initDefaultApp();
    this.repository = getRepository(UserDao);
  }

  async persist(user: User): Promise<void> {
    const dao = UserDao.create(user);
    await this.repository.create(dao);
  }

  async findById(id: UserId): Promise<User | null> {
    const dao = await this.repository.findById(id.value);
    return dao ? dao.toDomain() : null;
  }

  async findAll(): Promise<User[]> {
    const daos = await this.repository.find();
    return daos.map((dao) => {
      return dao.toDomain();
    });
  }

  async deleteById(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
