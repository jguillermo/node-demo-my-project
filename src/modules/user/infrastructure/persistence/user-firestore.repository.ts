import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserId } from '../../domain/user-id';
import { UserDao } from './user.dao';
import { UserRepository } from '../../domain/user.repository';
import {
  FirestoreService,
  Where,
  WhereOpStr,
} from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class UserFirestoreRepository extends UserRepository {
  private _collection = 'users';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(user: User): Promise<void> {
    const dao = UserDao.fromAggregate(user);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: UserId): Promise<User | null> {
    const item = await this.firestore.findOneDocumentById(
      this._collection,
      id.value,
    );
    if (!item) {
      return null;
    }
    return UserDao.fromItem(item).toAggregate();
  }

  async findAll(filters: any = {}): Promise<User[]> {
    const where: Where[] = [];
    if (filters.id?.isNotNull) {
      where.push({
        fieldPath: 'id',
        opStr: WhereOpStr.EQUAL_TO,
        value: filters.id.value,
      });
    }
    const items = await this.firestore.findAll(this._collection, where);
    return items.map((item) => {
      return UserDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: UserId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
