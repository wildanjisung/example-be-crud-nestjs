import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base-repository';
import { DataSource } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { PaginateQuery, Paginated, PaginateConfig, FilterOperator, FilterSuffix, paginate } from 'nestjs-paginate';

@Injectable({ scope: Scope.REQUEST })
export class PhotoRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async getAll(query: PaginateQuery): Promise<Paginated<Photo>> {
    const queryBuilder = await this.getRepository(Photo).createQueryBuilder('photo');
    
    const config: PaginateConfig<Photo> = {
      sortableColumns: ['id', 'name', 'description', 'views'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'description', 'views'],
      select: ['id', 'name', 'description', 'views', 'isPublished'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        views: true,
      },
    }

    const result = await paginate<Photo>(query, queryBuilder, config);
    return result;
  }

  async getOne(id: string) {
    return await this.getRepository(Photo).findOneBy({ id });
  }

  async create(photo: Photo) {
    return await this.getRepository(Photo).save(photo);
  }

  async update(id: string, photo: Photo) {
    return await this.getRepository(Photo).update(id, photo);
  }

  async delete(id: string) {
    return await this.getRepository(Photo).delete(id);
  }
}
