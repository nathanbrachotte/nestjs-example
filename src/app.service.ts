import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getFirstUserName() {
    return 'John Doe';
  }
}
