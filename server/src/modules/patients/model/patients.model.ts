import BaseModel from '@/models/BaseModel';
import { PATIENTS } from '@/common/dbTables';

import { CreatePatientDTO } from '../dto/create-patient.dto';
import { UpdatePatientDTO } from '../dto/update-patient.dto';

export class Patient extends BaseModel {
  private readonly TABLENAME = PATIENTS;

  table() {
    return this.query.table(this.TABLENAME);
  }

  create(patientBody: CreatePatientDTO) {
    return this.table().insert(patientBody);
  }

  getList() {
    return this.table().select('*');
  }

  getCount() {
    return this.table().count('* as total');
  }

  getById(id: Number) {
    return this.table().where({ id: id });
  }

  getByEmail(email: string) {
    return this.table().where({ email });
  }

  updateById(id: Number, patientBody: UpdatePatientDTO) {
    console.log(patientBody, 'patientBody');
    const query = this.table().update(patientBody).where({ id });

    console.log(query.toQuery());
    return query;
  }

  deleteById(id: Number) {
    return this.table().delete().where({ id: id });
  }
}
