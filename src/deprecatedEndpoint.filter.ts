import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class DeprecatedEndpointException extends Error {
  constructor(
    public override message: string,
    public alternativeEndpoint: string,
    public data?: any,
  ) {
    super(message);
  }
}

@Catch(DeprecatedEndpointException)
export class DeprecatedEndpointFilter implements ExceptionFilter {
  private readonly instanceLevel: string;
  private readonly logger = new Logger(DeprecatedEndpointFilter.name);

  constructor(private level: string) {
    this.instanceLevel = level;
  }

  catch(exception: DeprecatedEndpointException, host: ArgumentsHost): void {
    this.logger.debug(
      `Filter ${this.instanceLevel} -- Found a deprecated route`,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.GONE) // or appropriate status code
      .header('X-Deprecated-Message', exception.message)
      .header(
        'X-Deprecated-Alternative-Endpoint',
        exception.alternativeEndpoint,
      )
      .json({
        message: 'This endpoint is deprecated.',
      });
  }
}
