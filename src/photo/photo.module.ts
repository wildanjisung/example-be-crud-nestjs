import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoRepository } from './photo.repository';

@Module({
  controllers: [PhotoController],
  providers: [
    PhotoService,
    PhotoRepository
  ],
})
export class PhotoModule {}
