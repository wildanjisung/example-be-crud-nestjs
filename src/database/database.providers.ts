import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: './src/database/database.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
  // {
  //   provide: 'DATA_SOURCE_PG',
  //   useFactory: async () => {
  //     const dataSource = new DataSource({
  //       type: 'postgres',
  //       host: process.env.DATABASE_HOST,
  //       port: parseInt(process.env.DATABASE_PORT, 10),
  //       username: process.env.DATABASE_USER,
  //       password: process.env.DATABASE_PASSWORD,
  //       database: process.env.DATABASE_NAME,
  //       entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //       synchronize: !!process.env.DATABASE_SYNC,
  //     });

  //     return dataSource.initialize();
  //   },
  // },
];