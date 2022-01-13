import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'sibi1995',
  port: 5432,
  // host: '127.0.0.1',
  host: 'localhost',
  database: 'ideas',
  synchronize: true,
  // dropSchema: true,
  logging: true,
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity.ts'],
};
