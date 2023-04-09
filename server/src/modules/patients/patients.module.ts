import { Module } from '@nestjs/common';

import { Patient } from './model/patients.model';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({
  providers: [PatientsService, Patient],
  controllers: [PatientsController],
  exports: [PatientsService, Patient],
})
export class PatientsModule {}
