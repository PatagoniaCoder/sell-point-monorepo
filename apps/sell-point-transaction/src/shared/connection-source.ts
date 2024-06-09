import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
dotenvConfig();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_TRANSACTION_NAME,
  synchronize: false,
  logging: false,
  migrations: [join(__dirname, '../migrations/*.ts')],
  entities: [join(__dirname, '../**/**/**/*.entity.ts')],
  migrationsRun: true,
});
