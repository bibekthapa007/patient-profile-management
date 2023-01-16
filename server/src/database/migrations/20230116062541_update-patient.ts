import { Knex } from 'knex';
import { PATIENTS } from '../../common/dbTables';

const TABLE_NAME = PATIENTS;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string('gender').notNullable();
    table.string('contact').notNullable();
    table.string('address').notNullable();
    table.string('notes').notNullable();
    table.string('dob').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn('gender');
    table.dropColumn('contact');
    table.dropColumn('address');
    table.dropColumn('notes');
    table.dropColumn('dob');
  });
}
