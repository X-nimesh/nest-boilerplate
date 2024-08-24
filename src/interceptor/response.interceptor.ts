import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
export interface Response<T> {
  data: T;
}
@Injectable()
export class PageTransferResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const { query } = context.switchToHttp().getRequest();
    const req = context.switchToHttp().getRequest();

    let meta = {};

    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        if (query.page) {
          const [datas, length] = data;
          const totalPages = length / query.take;
          meta = {
            length,
            prev: query.page > 1 ? +query.page - 1 : null,
            next: query.page < totalPages ? +query.page + 1 : null,
          };
          if (Array.isArray(data)) {
            return {
              status: response.statusCode,
              message: `${req.customMessage ? req.customMessage : 'success'}`,
              meta,
              data: datas,
            };
          }
        }
        const message = data?.message;
        delete data?.message;
        return {
          status: response.statusCode || data?.status || 200,
          message: `${req.customMessage || message || 'success'}`,
          data: data?.data ? data?.data : data || null,
        };
      }),
    );
  }
}
