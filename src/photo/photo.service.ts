import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { PhotoRepository } from './photo.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PhotoService {
  constructor(
    private photoRepository: PhotoRepository,
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = plainToClass(Photo, createPhotoDto);
    return this.photoRepository.create(photo);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Photo>> {
    return this.photoRepository.getAll(query);
  }

  async findOne(id: string): Promise<Photo> {
    const photo = await this.photoRepository.getOne(id)
    if (!photo) {
      throw new NotFoundException(
        `Photo not found with Id ${id} not found`,
      );
    }
    return photo
  }

  async update(id: string, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.findOne(id)

    return await this.photoRepository.update(id, photo);
  }

  async remove(id: string) {
    const photo = await this.findOne(id)

    return await this.photoRepository.delete(id);
  }
}
