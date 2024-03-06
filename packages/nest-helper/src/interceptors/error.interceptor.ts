import {
  CallHandler,
  HttpException,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorInterceptor implements NestInterceptor {
  intercept(_, next: CallHandler) {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) {
          return throwError(err);
        }
        throw new InternalServerErrorException(err);
      }),
    );
  }
}
