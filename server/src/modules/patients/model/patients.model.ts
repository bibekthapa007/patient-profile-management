import BaseModel from '@/models/BaseModel';
import { PATIENTS } from '@/common/dbTables';

import { CreatePatientDTO } from '../dto/create-patient.dto';
import { UpdatePatientDTO } from '../dto/update-patient.dto';
import { NotFoundException } from '@nestjs/common';

export class Patient extends BaseModel {
    private readonly TABLENAME = PATIENTS

    table(){
        return this.query.table(this.TABLENAME);
    }

    create(patientBody: CreatePatientDTO){
       return this.table().insert(patientBody);
    }

    getList(){
        return this.table().select("*");
    }

    async getById(id: Number){
       return this.table().where({"id": id});
    }

    updateById(id: Number, patientBody: UpdatePatientDTO ){
        return this.table().update(patientBody).where({"id": id});
    }

    deleteById(id: Number){
        return this.table().delete().where({"id": id});
    }
}
