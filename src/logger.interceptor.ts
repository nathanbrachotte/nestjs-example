import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);
  private instanceLevel: string;

  constructor(private level: string) {
    this.instanceLevel = level;
  }

  intercept(context: ExecutionContext, handler: CallHandler) {
    const date = new Date();
    this.logger.debug(
      `LoggerInterceptor ${this.instanceLevel} -- Request count started.`,
    );

    return handler.handle().pipe(
      tap(() => {
        const totalTime = new Date().getTime() - date.getTime();

        this.logger.debug(
          `LoggerInterceptor ${this.instanceLevel} -- Request completed in: ${totalTime} ms`,
        );
      }),
    );
  }
}
