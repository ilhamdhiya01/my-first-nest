import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../src/common/prisma.service';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'johndoe',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        name: 'John Doe',
        username: 'johndoe',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }
}
