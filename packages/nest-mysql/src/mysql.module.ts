import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { getDataSourceOption } from './datasource';
import { MysqlModuleOptions } from './type';

@Module({})
export class MysqlModule {
  static forRootAsync(options: MysqlModuleOptions): DynamicModule {
    return {
      module: MysqlModule,
      global: true,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (_: MysqlModuleOptions) => {
            return {
              ...getDataSourceOption(options),
              logging: true,
              cache: true,
              synchronize: false,
            };
          },
          extraProviders: [
            {
              provide: 'MysqlModuleOptions',
              useValue: options,
            },
          ],
        }),
      ],
    };
  }

  static getMysqlModule() {
    return TypeOrmModule.forFeature([...entities]);
  }
}
