import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

export default class BaseModel {
  constructor(@InjectModel() protected readonly query: Knex) {}
}
