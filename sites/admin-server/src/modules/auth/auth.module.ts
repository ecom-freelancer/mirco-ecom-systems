import { Module } from '@nestjs/common';
import { MysqlModule } from '@packages/nest-mysql';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuardProvider } from './auth.guard';

@Module({
  imports: [
    MysqlModule.getMysqlModule(),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuardProvider],
  exports: [AuthService],
})
export class AuthModule {}
