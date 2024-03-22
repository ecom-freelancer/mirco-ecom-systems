import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from './typeorm.module';
import { MysqlModuleOptions } from './type';
import { EntityManager } from 'typeorm';
import { ENTITY_MANAGER, getRepositoryToken } from './constants';
import { entities } from './entities';

@Module({})
export class MysqlModule {
  static forRootAsync(options: MysqlModuleOptions): DynamicModule {
    return {
      module: MysqlModule,
      imports: [TypeOrmModule.forRootAsync(options)],
    };
  }

  static getMysqlModule(): DynamicModule {
    const entityProviders: Provider[] = entities.map((entity) => {
      return {
        provide: getRepositoryToken(entity),
        useFactory: (manager: EntityManager) => {
          console.log(
            '\x1b[33m%s\x1b[0m',
            `[Nest-Mysql] Entity: ${entity.name} has been injected`,
          );
          return manager.getRepository(entity);
        },
        inject: [ENTITY_MANAGER],
      };
    });
    return {
      module: MysqlModule,
      providers: entityProviders,
      exports: entityProviders,
    };
  }
}
