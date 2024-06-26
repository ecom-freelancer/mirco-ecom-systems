import { Module } from '@nestjs/common';
import { MysqlModule } from '@packages/nest-mysql';
import { UserService } from './user.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [MysqlModule.getMysqlModule()],
  providers: [UserService],
  exports: [UserService],
  controllers: [ProfileController],
})
export class UserModule {}
