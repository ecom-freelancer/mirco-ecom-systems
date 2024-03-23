import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from '../customer/customer.module';
import { AuthGuardProvider } from './auth.guard';
import { SessionModule } from '../session/session.module';

@Module({
  providers: [AuthService, AuthGuardProvider],
  controllers: [AuthController],
  imports: [CustomerModule, JwtModule, SessionModule],
})
export class AuthModule {}
