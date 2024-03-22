import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [CustomerModule, JwtModule],
})
export class AuthModule {}
