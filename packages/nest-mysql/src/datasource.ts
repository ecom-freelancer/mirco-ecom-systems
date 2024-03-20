import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlModuleOptions } from './type';
import { entities } from './entities';

export const getDataSourceOption = (
  options: MysqlModuleOptions,
): DataSourceOptions => ({
  type: 'mysql',
  host: options.host,
  port: +options.port || 3306,
  username: options.username,
  password: options.password,
  database: options.database,
  synchronize: false,
  logging: options.logging || false,
  entities: [...entities],
  migrations: [...options.migrations],
  namingStrategy: new SnakeNamingStrategy(),
});
