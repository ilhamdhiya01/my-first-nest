import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_FILTER } from '@nestjs/core';
import { ValidationService } from './validation.service';
import { PrismaService } from './prisma.service';
import { ErrorFilter } from './error.filter';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [WinstonModule, ConfigModule, PrismaService, ValidationService],
})
export class CommonModule {}
