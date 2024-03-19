import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@packages/nest-redis';
import { EmailModule } from '@packages/nest-mail';
import { CloudinaryModule } from '@packages/nest-file';
import { MysqlModule } from '@packages/nest-mysql';

import { AuthModule } from './modules/auth/auth.module';

import { getCloudinaryConfig } from './configs/cloudinary.config';
import { getMysqlOptions } from './configs/mysql.datasource';
import { getEmailConfigOptions } from './configs/email-config';
import { getRedisOptions } from './configs/redis.datasource';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MysqlModule.forRootAsync(getMysqlOptions()),
    RedisModule.forRootAsync(getRedisOptions()),
    EmailModule.forRootAsync(getEmailConfigOptions()),
    CloudinaryModule.forRootAsync(getCloudinaryConfig()),
    AuthModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
