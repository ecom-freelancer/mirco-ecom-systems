import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MysqlModule } from '@packages/nest-mysql';
import { getMysqlOptions } from './configs/mysql.datasource';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MysqlModule.forRootAsync(getMysqlOptions()),
  ],
})
export class AppModule {}
