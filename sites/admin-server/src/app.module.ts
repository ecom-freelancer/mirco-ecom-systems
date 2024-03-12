import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MysqlModule } from '@packages/nest-mysql';
import { getMysqlOptions } from './configs/mysql.datasource';

@Module({
  imports: [AuthModule, MysqlModule.forRootAsync(getMysqlOptions())],
})
export class AppModule {}
