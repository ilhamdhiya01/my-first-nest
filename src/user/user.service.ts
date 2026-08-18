/* eslint-disable @typescript-eslint/require-await */
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserResponse } from '../model/user.model';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { randomUUID } from 'crypto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async register(request: RegisterUserDto): Promise<UserResponse> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);

    const countSameUser = await this.userRepository.countUserBySameUsername(
      request.username,
    );

    if (countSameUser !== 0) {
      throw new HttpException('Username already exists', 400);
    }

    request.password = await bcrypt.hash(request.password, 10);

    const user = await this.userRepository.createUser(request);

    return {
      username: user.username,
      name: user.name,
    };
  }

  async login(request: LoginUserDto): Promise<UserResponse> {
    this.logger.info(`Login user ${JSON.stringify(request)}`);

    let user = await this.userRepository.findUserByUsername(request.username);

    if (!user) {
      throw new HttpException('Username or password is wrong', 401);
    }

    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(
      request.password,
      hashedPassword,
    );

    if (!isPasswordValid) {
      throw new HttpException('Username or password is wrong', 401);
    }

    const token = randomUUID();
    user = await this.userRepository.updateUser(request.username, token);

    return {
      username: user.username,
      name: user.name,
      token: user.token!,
    };
  }

  async get(user: User): Promise<UserResponse> {
    return {
      username: user.username,
      name: user.name,
    };
  }
}
