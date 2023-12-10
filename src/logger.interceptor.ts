import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {
  interceptorlevel: string;

  constructor(private level: string) {
    this.interceptorlevel = level;
  }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const date = new Date();
    Logger.debug(
      `LoggerInterceptor ${this.interceptorlevel} -- Request count started.`,
    );

    return handler.handle().pipe(
      tap(() => {
        const finishedDate = new Date();
        const totalTime = finishedDate.getTime() - date.getTime();
        Logger.debug(
          `LoggerInterceptor ${this.interceptorlevel} -- Request completed in: ${totalTime} ms`,
        );
      }),
    );
  }
}
