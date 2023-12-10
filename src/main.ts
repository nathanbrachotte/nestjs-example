import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { AuthGuard } from 'src/auth.guard';
import { CustomValidationPipe } from 'src/customValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new LoggerInterceptor('main'));
  app.useGlobalGuards(new AuthGuard('main'));
  // app.useGlobalPipes(new CustomValidationPipe('main'));
  await app.listen(3000);
}
bootstrap();
