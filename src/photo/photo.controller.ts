import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Photo,
  })
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photoService.create(createPhotoDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Photo>> {
    return this.photoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(id);
  }
}
