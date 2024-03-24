import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from '@packages/nest-mysql';
import { RedisModule } from '@packages/nest-redis';
import { EmailModule } from '@packages/nest-mail';
import { CloudinaryModule } from '@packages/nest-file';
import { AuthModule } from './modules/auth/auth.module';
import { getMysqlOptions } from './configs/mysql.datasource';
import { getRedisOptions } from './configs/redis.datasource';
import { getEmailConfigOptions } from './configs/email-config';
import { getCloudinaryConfig } from './configs/cloudinary.config';
import { GoogleModule } from '@packages/nest-google';
import { getGoogleConfigOptions } from './configs/google.config';

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
    GoogleModule.forRootAsync(getGoogleConfigOptions()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
