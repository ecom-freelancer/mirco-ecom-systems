import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { MysqlModule } from '@packages/nest-mysql';

@Module({
  imports: [MysqlModule.getMysqlModule()],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
