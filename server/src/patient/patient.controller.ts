import { Controller, Get } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService){}

    @Get("/")
    async getPatients(){
        return this.patientService.getPatients();
    }
}
