import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export type TReturn = {
  status: number;
  data: any;
};

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  private logger = new Logger('API');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const { method, url } = context.switchToHttp().getRequest<Request>();
    console.log(`Request... `, { method, url });

    // tap : chạm, không thay đổi dữ liệu trả về, lỗi sẽ không bắt được
    // finalize : không thay đổi dữ liệu trả về, bắt được kể cả lỗi
    // map : thay đổi dữ liệu trả về, format, bắt lỗi
    return next
      .handle()
      .pipe(finalize(() => this.logger.log(`After... ${Date.now() - now}ms`)));
  }
}
