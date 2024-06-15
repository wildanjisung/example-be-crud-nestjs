import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY', // FIXME: move to constant
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'], // FIXME: move to constant
  },
];