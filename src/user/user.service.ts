import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    private userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);

    const registerRequest: RegisterUserRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const countSameUser = await this.userRepository.countUserBySameUsername(
      registerRequest.username,
    );

    if (countSameUser !== 0) {
      throw new HttpException('Username already exists', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await this.userRepository.createUser(registerRequest);

    return {
      username: user.username,
      name: user.name,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.info(`Login user ${JSON.stringify(request)}`);

    const loginRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    const user = await this.userRepository.findUserByUsername(
      loginRequest.username,
    );

    if (!user) {
      throw new HttpException('Username or password is wrong', 401);
    }

    const hashedPassword = user.password as string;
    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      hashedPassword,
    );

    if (!isPasswordValid) {
      throw new HttpException('Username or password is wrong', 401);
    }

    return {
      username: loginRequest.username,
      name: loginRequest.username,
      token: 'token',
    };
  }
}
