import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Provider,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { SessionService } from '../session/session.service';

export const ROUTE_IS_PROTECTED = 'ROUTE_IS_PROTECTED';

export const Protected = () => SetMetadata(ROUTE_IS_PROTECTED, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
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
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    let payload = { sub: '', sessionId: '' };

    // If we cannot verify -> throw Unauthorized
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (_) {
      throw new UnauthorizedException('Token is invalid');
    }

    const { sub, sessionId } = payload;

    if (!(await this.sessionService.checkSessionExists(sub, sessionId))) {
      throw new UnauthorizedException();
    }

    request['userId'] = sub;
    request['sessionId'] = sessionId;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export const AuthGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
