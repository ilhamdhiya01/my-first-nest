import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RegisterUserRequest } from '../model/user.model';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async countUserBySameUsername(username: string): Promise<number> {
    const countUser = await this.prismaService.user.count({
      where: {
        username,
      },
    });
    return Number(countUser);
  }

  async createUser(data: RegisterUserRequest) {
    return await this.prismaService.user.create({
      data,
    });
  }

  async findUserByUsername(username: string) {
    return await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }
}
