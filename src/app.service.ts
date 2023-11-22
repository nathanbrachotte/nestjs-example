import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export const userPayload = {
  where: {
    avatar: {
      isNot: null,
    },
  },
  include: {
    avatar: true,
  },
};

const userWithPost = Prisma.validator<Prisma.UserDefaultArgs>()(userPayload);

export type UserWithPost = Prisma.UserGetPayload<typeof userWithPost>;

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getFirstUserName(): Promise<string> {
    const user = await this.prisma.user.findFirst(userWithPost);

    return user.name;
  }
}
