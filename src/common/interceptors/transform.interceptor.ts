import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse();
    const code = res.statusCode;
    console.log('code ======', code);

    return next.handle().pipe(map(data => {
      console.log('Interceptor');
      const transferData = data;
      if (data) {
        if (data.data) {
          transferData.result = transferData.data;
          transferData.data = undefined;
        }
      }
      return transferData;
    }));

  }
}
