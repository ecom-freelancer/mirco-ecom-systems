import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@packages/nest-redis';
import { EmailModule } from '@packages/nest-mail';
import { CloudinaryModule } from '@packages/nest-file';
import { MysqlModule } from '@packages/nest-mysql';
import { AuthModule } from './modules/auth/auth.module';
import { getCloudinaryConfig } from './configs/cloudinary.config';
import { getMysqlOptions } from './configs/mysql.datasource';
import { getEmailConfigOptions } from './configs/email.config';
import { getRedisOptions } from './configs/redis.config';
import { UserModule } from './modules/user/user.module';
import { GoogleModule } from '@packages/nest-google';
import { FacebookModule } from '@packages/nest-facebook';
import { getGoogleConfigOptions } from './configs/google.config';
import { getFacebookConfigOptions } from './configs/facebook.config';
import { ProductModule } from './modules/products/product.module';
import { FileModule } from './modules/files/file.module';
import { InventoryModule } from './modules/inventory/inventory.module';

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
    GoogleModule.forRootAsync(getGoogleConfigOptions()),
    FacebookModule.forRootAsync(getFacebookConfigOptions()),

    AuthModule,
    UserModule,
    ProductModule,
    FileModule,
    InventoryModule,
  ],
  controllers: [],
})
export class AppModule {}
