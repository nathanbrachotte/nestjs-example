import { PrismaClient } from '@prisma/client';

import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * This wraps the prisma client and makes it injectable, so that we can use it in other modules
 * https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
