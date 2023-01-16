import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from '@nestjs/config';

import { snakeCase } from 'change-case';
import camelcaseKeys from 'camelcase-keys';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { PatientsModule } from '@/modules/patients/patients.module';

import { LoggerMiddleware } from '@/middlewares/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),

    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '8.0',
        useNullAsDefault: true,
        connection: {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          typeCast: (field, next) => {
            if (field.type == 'DATE') {
              return field.string();
            }

            return next();
          },
        },
        wrapIdentifier: (value: string, origImpl: any) => {
          if (value === '*') {
            return origImpl(value);
          }

          return origImpl(snakeCase(value));
        },
        postProcessResponse: (result) => {
          if (!Array.isArray(result)) {
            return result;
          }

          if (
            result.length === 0 ||
            !result[0] ||
            typeof result[0] !== 'object'
          ) {
            return result;
          }

          return camelcaseKeys(result, { deep: true });
        },
      },
    }),

    UsersModule,
    AuthModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
