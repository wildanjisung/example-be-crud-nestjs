import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,

  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photoRepository.save(createPhotoDto);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Photo>> {
    return paginate(query, this.photoRepository, {
      sortableColumns: ['id', 'name', 'description', 'views'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name', 'description', 'views'],
      select: ['id', 'name', 'description', 'views', 'isPublished'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        views: true,
      },
    })
  }

  async findOne(id: string): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { id } })
    if (!photo) {
      throw new NotFoundException(
        `Photo not found with Id ${id} not found`,
      );
    }
    return photo
  }

  async update(id: string, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.findOne(id)

    return await this.photoRepository.save(photo);
  }

  async remove(id: string) {
    const photo = await this.findOne(id)

    return await this.photoRepository.remove(photo);
  }
}
