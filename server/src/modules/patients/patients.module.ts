import { Module } from '@nestjs/common';
import { Patient } from './model/patients.model';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  providers: [PatientsService, Patient],
  controllers: [PatientsController],
  exports: [PatientsService, Patient]
})
export class PatientsModule {}
