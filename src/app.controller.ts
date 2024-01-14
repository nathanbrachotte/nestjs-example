import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { AuthGuard } from 'src/auth.guard';
import { OgQueryDto } from 'src/ogQuery.dto';
import { CustomValidationPipe } from 'src/customValidation.pipe';
import {
  DeprecatedEndpointException,
  DeprecatedEndpointFilter,
} from 'src/deprecatedEndpoint.filter';

@Controller()
@UseGuards(new AuthGuard('controller'))
@UseInterceptors(new LoggerInterceptor('controller'))
@UsePipes(new CustomValidationPipe('controller'))
@UseFilters(new DeprecatedEndpointFilter('controller'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(new LoggerInterceptor('route'))
  @UseGuards(new AuthGuard('route'))
  @UseFilters(new DeprecatedEndpointFilter('route'))
  @Get('/og')
  async getOGByName(
    @Query(new CustomValidationPipe('route')) query: OgQueryDto,
  ): Promise<string> {
    throw new DeprecatedEndpointException(
      'This endpoint was removed because we all know John Wick is the real OG',
      '/john-wick',
    );
    return query.name;
  }
}
