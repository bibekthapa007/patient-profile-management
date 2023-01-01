import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }), PatientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
