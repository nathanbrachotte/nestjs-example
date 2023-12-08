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
  guardLevel: string;

  constructor(private level: string) {
    this.guardLevel = level;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>(); // Need to infer Request as otherwise its type is `any` :(
    Logger.debug(`Guard ${this.guardLevel} -- Verifying cookie`);

    const cookie = request.headers.cookie;

    return !!cookie;
  }
}
