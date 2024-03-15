import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Provider,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

export const ROUTE_IS_PROTECTED = 'ROUTE_IS_PROTECTED';

export const Protected = () => SetMetadata(ROUTE_IS_PROTECTED, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

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
      throw new UnauthorizedException();
    }

    const payload = await this.authService.verifyAsync(token);
    request['user-id'] = payload.sub;
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
