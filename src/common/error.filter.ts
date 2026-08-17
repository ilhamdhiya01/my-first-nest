import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse();
      const errors =
        typeof res === 'object' && res !== null && 'message' in res
          ? (res as { message: string[] }).message
          : res;

      response.status(exception.getStatus()).json({
        errors,
      });
    } else {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    }
  }
}
