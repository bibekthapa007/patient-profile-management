import { Knex } from 'knex';

import BaseModel from '@/models/BaseModel';
import { PATIENTS } from '@/common/dbTables';
import { PATIENTS_SORT_BY_ORDER, SORTING_ORDER } from '@/common/enums/sort';

import { GetPatientsDto } from '../dto/get-patient.dto';
import { CreatePatientDTO } from '../dto/create-patient.dto';
import { UpdatePatientDTO } from '../dto/update-patient.dto';

export class Patient extends BaseModel {
  private readonly TABLENAME = PATIENTS;

  table() {
    return this.query.table(this.TABLENAME);
  }

  public baseQuery() {
    return this.table().select('*');
  }

  create(patientBody: CreatePatientDTO) {
    return this.table().insert(patientBody);
  }

  injectFilters(query: Knex.QueryBuilder, filters: GetPatientsDto) {
    if (filters.size) {
      query.limit(filters.size);
    }

    if (filters.page) {
      query.offset((filters.page - 1) * (filters.size || 10));
    }

    if (filters.q) {
      query.where(function (data) {
        data
          .orWhereRaw(`name LIKE '%${filters.q}%'`)
          .orWhereRaw(`email LIKE '%${filters.q}%'`)
          .orWhereRaw(`contact LIKE '%${filters.q}%'`);
      });
    }
  }

  injectSortBy(query: Knex.QueryBuilder, filters: GetPatientsDto) {
    if (!filters.sortBy) {
      query.orderBy('createdAt', SORTING_ORDER.DESCENDING);

      return;
    }

    const order = filters.order || SORTING_ORDER.ASCENDING;

    switch (filters.sortBy) {
      case PATIENTS_SORT_BY_ORDER.name:
        query.orderBy('name', order);

      case PATIENTS_SORT_BY_ORDER.address:
        query.orderBy('address', order);

      case PATIENTS_SORT_BY_ORDER.contact:
        query.orderBy('contact', order);

      case PATIENTS_SORT_BY_ORDER.lastAppointment:
      // TODO: add sort by based on last appointment

      case PATIENTS_SORT_BY_ORDER.newAppointment:
      // TODO: add sort by based on new appointment

      case PATIENTS_SORT_BY_ORDER.registerDate:
        query.orderBy('createdAt', order);
    }
  }

  getList(filters: GetPatientsDto) {
    const query = this.baseQuery();

    this.injectFilters(query, filters);
    this.injectSortBy(query, filters);

    return query;
  }

  getCount() {
    return this.table().count('* as total');
  }

  getById(id: number) {
    return this.table().where({ id: id });
  }

  getByEmail(email: string) {
    return this.table().where({ email });
  }

  updateById(id: number, patientBody: UpdatePatientDTO) {
    return this.table().update(patientBody).where({ id });
  }

  deleteById(id: number) {
    return this.table().delete().where({ id: id });
  }
}
