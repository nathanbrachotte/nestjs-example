import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  private instanceLevel: string;

  constructor(private level: string) {
    this.instanceLevel = level;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); // Need to infer Request as otherwise its type is `any` :(

    this.logger.debug(`Guard ${this.instanceLevel} -- Verifying cookie`);

    const cookie = request.headers.cookie;

    return !!cookie;
  }
}
