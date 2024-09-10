/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('fiis_segmentos', (table) => {
    table.increments('id');
    table.string('descricao', 60).notNullable();
    table.primary(['id'], { constraintName: 'pk_fiis_segmentos' });
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('fiis_segmentos');
}
