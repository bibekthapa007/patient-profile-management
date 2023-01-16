import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('patients', function (table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('gender').notNullable();
    table.string('dob').notNullable();
    table.string('contact').notNullable();
    table.string('address').notNullable();
    table.string('notes').notNullable().defaultTo('');
    table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.datetime('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('patients');
}
