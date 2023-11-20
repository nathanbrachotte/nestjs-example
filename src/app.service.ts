import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getFirstUserName(): Promise<string> {
    const user = await this.prisma.user.findFirst();

    return user.name;
  }
}
