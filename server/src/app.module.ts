import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PatientsModule } from './modules/patients/patients.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
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
      },
    },
  }),
  
  PatientsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
