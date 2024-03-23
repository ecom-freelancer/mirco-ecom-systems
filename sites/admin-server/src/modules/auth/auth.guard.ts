import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Provider,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { extractTokenFromHeader } from '@packages/nest-helper';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from '../session/session.service';

export const ROUTE_IS_PROTECTED = 'ROUTE_IS_PROTECTED';

export const Protected = () => SetMetadata(ROUTE_IS_PROTECTED, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isProtected = this.reflector.getAllAndOverride<boolean>(
      ROUTE_IS_PROTECTED,
      [context.getHandler(), context.getClass()],
    );

    if (!isProtected) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload = { sub: '', sessionId: '' };

    // If cannot verify -> throw Unauthorized
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (_) {
      throw new UnauthorizedException();
    }

    const { sub, sessionId } = payload;

    if (!(await this.sessionService.checkSessionExists(sub, sessionId))) {
      throw new UnauthorizedException();
    }

    request['userId'] = sub;
    request['sessionId'] = sessionId;
    return true;
  }
}

export const AuthGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
