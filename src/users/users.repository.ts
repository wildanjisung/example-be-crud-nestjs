import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base-repository';
import { DataSource } from 'typeorm';
import { PaginateQuery, Paginated, PaginateConfig, FilterOperator, FilterSuffix, paginate } from 'nestjs-paginate';
import { User } from './entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async getAll(query: PaginateQuery): Promise<Paginated<User>> {
    const queryBuilder = await this.getRepository(User).createQueryBuilder('user');
    
    const config: PaginateConfig<User> = {
      sortableColumns: ['id', 'username'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['username'],
      select: ['id', 'username'],
      filterableColumns: {
        username: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    }

    return await paginate<User>(query, queryBuilder, config);
  }

  async getOne(id: string): Promise<User> {
    return await this.getRepository(User).findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    return await this.getRepository(User).save(user);
  }

  async update(id: string, user: User) {
    return await this.getRepository(User).update(id, user);
  }

  async delete(id: string): Promise<any> {
    return await this.getRepository(User).delete(id);
  }
  
  //  custom

  async getOneByUsername(username: string) {
    return await this.getRepository(User).findOneBy({ username: username });
  }
}
