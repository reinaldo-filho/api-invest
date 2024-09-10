/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('fiis_tipos', (table) => {
    table.increments('id');
    table.string('descricao', 40).notNullable();
    table.primary(['id'], { constraintName: 'pk_fiis_tipos' });
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('fiis_tipos');
}
