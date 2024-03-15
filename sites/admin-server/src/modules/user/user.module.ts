import { Module } from '@nestjs/common';
import { MysqlModule } from '@packages/nest-mysql';
import { UserService } from './user.service';

@Module({
  imports: [MysqlModule.getMysqlModule()],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
