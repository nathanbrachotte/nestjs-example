import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerMiddleware } from 'src/logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { CustomValidationPipe } from 'src/customValidation.pipe';
import { DeprecatedEndpointFilter } from 'src/deprecatedEndpoint.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useFactory: () => {
        return new AuthGuard('app module');
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => {
        return new LoggerInterceptor('app module');
      },
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new CustomValidationPipe('app module');
      },
    },
    {
      provide: APP_FILTER,
      useFactory: () => {
        return new DeprecatedEndpointFilter('app module');
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(AppController);
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
