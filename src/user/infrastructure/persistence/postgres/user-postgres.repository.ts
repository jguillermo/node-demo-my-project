import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { UserRepository } from '../../../domain/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from './user.dao';
import { User } from '../../../domain/user';
import { UserId } from '../../../domain/user-id';

@Injectable()
export class UserPostgresRepository extends UserRepository {
  constructor(
    @InjectRepository(UserDao)
    private repository: Repository<UserDao>,
  ) {
    super();
  }

  async persist(user: User): Promise<void> {
    const dao = UserDao.fromAggregate(user);
    await this.repository.save(dao);
  }

  async findById(id: UserId): Promise<User | null> {
    const dao = await this.repository.findOne({ where: { id: id.value } });
    if (!dao) {
      return null;
    }
    return dao.toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<User[]> {
    return [];
  }

  async deleteById(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
