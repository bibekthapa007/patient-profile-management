import {
  Injectable,
  NotFoundException,
  BadRequestException,
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

  public async getPatientById(id: number) {
    const [patient] = await this.patients.getById(id);

    return { patient };
  }

  public async createPatient(patientBody: CreatePatientDTO) {
    const [oldpatient] = await this.patients.getByEmail(patientBody.email);

    if (oldpatient) {
      throw new BadRequestException(
        `Patient with email ${oldpatient.email} already exists.`,
      );
    }

    const [patientId] = await this.patients.create(patientBody);

    const [createdPatient] = await this.patients.getById(patientId);

    return { patient: createdPatient };
  }

  public async updatePatient(patientId: number, patientBody: UpdatePatientDTO) {
    delete patientBody.file;

    const updatedPatientId = await this.patients.updateById(
      patientId,
      patientBody,
    );

    const [updatedPatient] = await this.patients.getById(updatedPatientId);

    return { patient: updatedPatient };
  }

  public async deletePatient(patientId: number) {
    const [patient] = await this.patients.getById(patientId);

    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} was not Found`);
    }

    return await this.patients.deleteById(patientId);
  }
}
