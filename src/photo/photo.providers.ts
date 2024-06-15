import { DataSource } from 'typeorm';
import { Photo } from './entities/photo.entity';

export const photoProviders = [
  {
    provide: 'PHOTO_REPOSITORY', // FIXME: move to constant
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
    inject: ['DATA_SOURCE'], // FIXME: move to constant
  },
];