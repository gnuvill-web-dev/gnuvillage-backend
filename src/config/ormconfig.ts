import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.DATABASE_SYNCHRONIZE as unknown as boolean,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN as unknown as boolean,
});

export default dataSource;
