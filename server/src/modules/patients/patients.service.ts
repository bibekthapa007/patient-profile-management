import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Patient } from './model/patients.model';

import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private patients: Patient) {}

  public async getPatients() {
    const patients = await this.patients.getList();
    const [data] = await this.patients.getCount();
    const { total } = data;

    return { patients, total };
  }

  public async getPatientById(id: Number) {
    const [patient] = await this.patients.getById(id);

    return { patient };
  }

  public async createPatient(patientBody: CreatePatientDTO) {
    let [oldpatient] = await this.patients.getByEmail(patientBody.email);

    if (oldpatient) {
      throw new BadRequestException(
        `Patient with email ${oldpatient.email} already exists.`,
      );
    }

    let [patientId] = await this.patients.create(patientBody);

    let [createdPatient] = await this.patients.getById(patientId);

    return { patient: createdPatient };
  }

  public async updatePatient(patientId: Number, patientBody: UpdatePatientDTO) {
    delete patientBody.file;

    let updatedPatientId = await this.patients.updateById(
      patientId,
      patientBody,
    );

    let [updatedPatient] = await this.patients.getById(updatedPatientId);

    return { patient: updatedPatient };
  }

  public async deletePatient(patientId: Number) {
    let [patient] = await this.patients.getById(patientId);

    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} was not Found`);
    }

    return await this.patients.deleteById(patientId);
  }
}
