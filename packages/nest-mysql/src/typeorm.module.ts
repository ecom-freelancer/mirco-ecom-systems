import {
  DynamicModule,
  Global,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MysqlModuleOptions } from './type';
import { CONNECTION, DATA_SOURCE, ENTITY_MANAGER } from './constants';
import { DataSource } from 'typeorm';
import { getDataSourceOption } from './datasource';
import { defer, lastValueFrom } from 'rxjs';

@Global()
@Module({})
export class TypeOrmModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string) {
    const dataSource = this.moduleRef.get<DataSource>(DATA_SOURCE);
    if (dataSource.isInitialized) {
      dataSource.destroy();
    }
  }

  static forRootAsync(options: MysqlModuleOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: CONNECTION,
      useValue: options,
    };

    const datasoureProvider: Provider = {
      provide: DATA_SOURCE,
      useFactory: (options: MysqlModuleOptions) => {
        const dataSource = new DataSource({
          logging: false,
          synchronize: false,
          cache: true,
          ...getDataSourceOption(options),
        });
        return lastValueFrom(
          defer(() =>
            dataSource.initialize().then((d) => {
              console.log(
                '\x1b[33m%s\x1b[0m',
                'Connect to database successfully!',
              );
              return d;
            }),
          ),
        );
      },
      inject: [CONNECTION],
    };

    const entityManagerProvider: Provider = {
      provide: ENTITY_MANAGER,
      useFactory: (dataSource: DataSource) => dataSource.manager,
      inject: [DATA_SOURCE],
    };

    return {
      module: TypeOrmModule,
      providers: [connectionProvider, datasoureProvider, entityManagerProvider],
      exports: [datasoureProvider, entityManagerProvider],
    };
  }
}
