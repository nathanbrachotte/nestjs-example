import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { AuthGuard } from 'src/auth.guard';
import { OgQueryDto } from 'src/ogQuery.dto';

@Controller()
@UseGuards(new AuthGuard('controller'))
// @UseInterceptors(new LoggerInterceptor('controller'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseInterceptors(new LoggerInterceptor('method'))
  @UseGuards(new AuthGuard('method'))
  @Get('/og')
  async getFirstUsersNames(@Query() query: OgQueryDto): Promise<string> {
    const a = query;
    return await this.appService.getFirstUserName();
  }
}
