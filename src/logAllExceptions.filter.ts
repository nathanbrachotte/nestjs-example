import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class LogAllExceptionsFilter implements ExceptionFilter {
  private readonly instanceLevel: string = 'default';
  private readonly logger = new Logger(LogAllExceptionsFilter.name);

  constructor(private level: string = 'default') {
    this.instanceLevel = level;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.debug(`Filter ${this.instanceLevel} -- Caught an error`);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const wasCaughtException = exception instanceof HttpException;

    const httpStatus = wasCaughtException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      message: wasCaughtException
        ? exception['message']
        : 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: response.url,
    };

    this.logger.error(
      httpStatus >= 500 ? 'Server Exception' : 'Bad Request',
      responseBody,
    );

    // TODO: Figure response out
    // response.status(httpStatus).json(responseBody);
  }
}

// TODO: Ask chatGPT
// @Catch()
// export class LogAllExceptionsFilterMain extends LogAllExceptionsFilter {
//   private override instanceLevel = 'defaultdsa';
// }
