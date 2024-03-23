import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuardProvider } from './auth.guard';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [JwtModule, UserModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuardProvider],
  exports: [AuthService],
})
export class AuthModule {}
