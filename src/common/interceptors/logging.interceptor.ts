import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('REQUEST ACCEPTED...');

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => {
          console.log(`RESPONSE SEND...   TIME ${Date.now() - now} ms`);
        }),
      )
      .pipe(
        catchError((error) => {
          console.log(`ERROR SEND...   TIME ${Date.now() - now} ms`);
          return throwError(
            () => new HttpException(error?.response, error?.status),
          );
        }),
      );
  }
}
