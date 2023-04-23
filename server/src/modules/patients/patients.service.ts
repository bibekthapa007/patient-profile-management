import {
  Logger,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Patient } from './model/patients.model';

import { GetPatientsDto } from './dto/get-patient.dto';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  private logger: Logger;

  constructor(private patients: Patient) {
    this.logger = new Logger('PatientsService');
  }

  private getMeta(pageParams: PageParams, count: number): Meta {
    return {
      page: pageParams.page,
      pageSize: pageParams.size,
      total: count,
    };
  }

  public async getPatients(query: GetPatientsDto) {
    this.logger.log(`Get all patients`);

    const { size, page, q } = query;

    const data = await this.patients.getList(query);
    const [{ total }] = await this.patients.getCount();

    const meta = this.getMeta({ size, page }, total);

    return { data, meta };
  }

  public async getPatientById(id: number) {
    this.logger.log(`Get patient by id: ${id}`);

    const [patient] = await this.patients.getById(id);

    return { patient };
  }

  public async createPatient(patientBody: CreatePatientDTO) {
    this.logger.log(`Create Patient`);

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
    this.logger.log(`Update patient by id: ${patientId}`);

    delete patientBody.file;

    const updatedPatientId = await this.patients.updateById(
      patientId,
      patientBody,
    );

    const [updatedPatient] = await this.patients.getById(updatedPatientId);

    return { patient: updatedPatient };
  }

  public async deletePatient(patientId: number) {
    this.logger.log(`Delete patient by id: ${patientId}`);

    const [patient] = await this.patients.getById(patientId);

    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} was not Found`);
    }

    return await this.patients.deleteById(patientId);
  }
}
