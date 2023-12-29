import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { AuthGuard } from 'src/auth.guard';
import { OgQueryDto } from 'src/ogQuery.dto';
import { CustomValidationPipe } from 'src/customValidation.pipe';

@Controller()
@UseGuards(new AuthGuard('controller'))
@UseInterceptors(new LoggerInterceptor('controller'))
@UsePipes(new CustomValidationPipe('controller'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(new LoggerInterceptor('method'))
  @UseGuards(new AuthGuard('method'))
  @Get('/og')
  async getFirstUsersNames(
    @Query('', new CustomValidationPipe('method')) query: OgQueryDto,
  ): Promise<string> {
    console.log({ query });

    // To trigger the filter
    // throw new Error('kaboom');

    return await this.appService.getFirstUserName();
  }
}
