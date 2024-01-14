import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
// Assuming you're using express, don't forget to add @types/express to your project
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(
      `Middleware -- Received request from agent ${req.headers['user-agent']}`,
    );

    next();
  }
}
