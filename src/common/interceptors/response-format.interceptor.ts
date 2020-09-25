import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number,
  message: string,
  data: T;
}

@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse();
    const code = res.statusCode;
    if (code === 200 || code === 201 || code === 202) return next.handle().pipe(map(data => ({
      statusCode: code,
      message: 'Success !!!',
      data
    })));
    return next.handle().pipe(
      catchError(err => {
        console.log('CONSOLE_LOG_ERROR ============>', err);
        return throwError(new BadGatewayException());
      })
    );
  }
}
