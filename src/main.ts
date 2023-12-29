import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from 'src/auth.guard';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { CustomValidationPipe } from 'src/customValidation.pipe';
import { LogAllExceptionsFilter } from 'src/logAllExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //? Is this the same as inject in AppModule? Then probably just do it there?
  app.useGlobalGuards(new AuthGuard('main'));
  app.useGlobalInterceptors(new LoggerInterceptor('main'));
  app.useGlobalPipes(new CustomValidationPipe('main'));
  app.useGlobalFilters(new LogAllExceptionsFilter('main'));

  await app.listen(3001);
}
bootstrap();
