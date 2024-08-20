import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';

config();

export const typeOrmConfigs = () => {
  const obj: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(<string>process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'multi_tenant_ecommerce',
    logging: process.env.NODE_ENV === 'local' || 'development' ? true : false,
    logger: 'debug',
    // entities: [`dist/src/**/*.entity.{ts,js}`],
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../database/migrations/*.{ts,js}')],
    subscribers: [
      join(
        __dirname,
        `/../database/subscribers/typeorm-entity.subscriber.{ts,js}`,
      ),
    ],
    // ! don't use synchronize in production
    synchronize: false,
    // driver: pg,
  };
  return obj;
};
