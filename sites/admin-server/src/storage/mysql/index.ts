import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOption } from './datasource';
import entities from './entities';

@Module({})
export class MysqlModule {
  static forRootAsync(): DynamicModule {
    return {
      module: MysqlModule,
      imports: [
        TypeOrmModule.forRoot({
          ...getDataSourceOption(),
        }),
      ],
    };
  }

  static getMySQLModule(): DynamicModule {
    return TypeOrmModule.forFeature(entities);
  }
}
