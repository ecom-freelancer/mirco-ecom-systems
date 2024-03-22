import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [CustomerModule],
})
export class AuthModule {}
