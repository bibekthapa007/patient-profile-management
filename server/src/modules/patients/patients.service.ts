import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';
import { Patient } from './model/patients.model';

@Injectable()
export class PatientsService {
    constructor(private patients: Patient){}

    public async getPatients() {
        return await this.patients.getList();
    }

    public async getPatientById(id: Number) {
        return await this.patients.getById(id);
    }


    public async createPatient(patientBody: CreatePatientDTO) {
        let [patientId] =  await this.patients.create(patientBody);

        let [createdPatient] = await this.patients.getById(patientId);

        return createdPatient;
    }

    public async updatePatient(patientId: Number,patientBody: UpdatePatientDTO){
        let updatedPatientId = await this.patients.updateById(patientId, patientBody);

        let [updatedPatient] = await this.patients.getById(updatedPatientId);

        return updatedPatient;
    }

    public async deletePatient(patientId: Number){
        let [patient] = await this.patients.getById(patientId);

        if(!patient){
            throw new NotFoundException(`Patient with id ${patientId} was not Found`);
        }

        return await this.patients.deleteById(patientId);
    }

}
