import { MysqlModuleOptions, getDataSourceOption } from '@packages/nest-mysql';
import { DataSource } from 'typeorm';
import { envLoader } from './env.loader';

envLoader();

export const getMysqlOptions = (): MysqlModuleOptions => {
  return {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    logging: process.env.MIGRATION_LOGGING === 'true',

    migrations: ['dist/migrations/*.js'],
  };
};

const dataSource = new DataSource(getDataSourceOption(getMysqlOptions()));

export default dataSource;
