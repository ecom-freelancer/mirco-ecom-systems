import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MysqlModule } from '@packages/nest-mysql';
import { getMysqlOptions } from './configs/mysql.datasource';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MysqlModule.forRootAsync(getMysqlOptions()),
    AuthModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
