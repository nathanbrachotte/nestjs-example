import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { AuthGuard } from 'src/auth.guard';

@Controller()
@UseGuards(new AuthGuard('controller'))
@UseInterceptors(new LoggerInterceptor('controller'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/og')
  async getHello(): Promise<string> {
    return await this.appService.getFirstUserName();
  }
}
