import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MysqlModule } from '@packages/nest-mysql';

@Module({
  imports: [MysqlModule.getMysqlModule()],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
