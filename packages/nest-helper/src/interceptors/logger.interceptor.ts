import { NestInterceptor } from '@nestjs/common';

export class LoggerInterceptor implements NestInterceptor {
  intercept(_, next) {
    return next.handle();
  }
}
