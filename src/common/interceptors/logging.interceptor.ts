/* eslint-disable no-console */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const test = context.switchToHttp().getRequest();
    console.log('BODY ------->', test.body);
    test.body.data[0].user = undefined;
    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
