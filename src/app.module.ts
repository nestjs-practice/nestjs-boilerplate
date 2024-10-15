import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import Joi from 'joi';
import winston from 'winston';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().valid('postgres').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        HASH_ROUNDS: Joi.number().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({}),
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public/',
    }),
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({
              all: true,
            }),
            winston.format.timestamp(),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.context}] ${info.level} ${info.message}`,
            ),
          ),
        }),
        new winston.transports.File({
          dirname: join(process.cwd(), 'logs'),
          filename: 'logs.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.context}] ${info.level} ${info.message}`,
            ),
          ),
        }),
      ],
    }),
    // todo : domain module 추가
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // todo : 추가 작업 필요
    consumer.apply();
  }
}
