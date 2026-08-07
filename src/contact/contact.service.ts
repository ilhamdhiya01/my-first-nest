import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export class ContactService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  getMe() {
    this.logger.info('Getting current user');
    return 'Hello World!';
  }
}
