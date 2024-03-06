import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import entities from './entities';

dotenv.config({
  path: '.env.local',
});

export const getDataSourceOption = () =>
  ({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    entities: [...entities],
    migrations: ['dist/mysql/migrations/*.js'],
    namingStrategy: new SnakeNamingStrategy(),
  } as DataSourceOptions);

const dataSource = new DataSource(getDataSourceOption());

export default dataSource;
