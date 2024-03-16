import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MysqlModule } from '@packages/nest-mysql';
import { getMysqlOptions } from './configs/mysql.datasource';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@packages/nest-redis';
import { getRedisOptions } from './configs/redis.datasource';
import { EmailModule } from '@packages/nest-mail';
import { getEmailConfigOptions } from './configs/email-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MysqlModule.forRootAsync(getMysqlOptions()),
    AuthModule,
    RedisModule.forRootAsync(getRedisOptions()),
    EmailModule.forRootAsync(getEmailConfigOptions()),
  ],
  controllers: [],
})
export class AppModule {}
