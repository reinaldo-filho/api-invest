/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('fiis', (table) => {
    table.specificType('ticker', 'char(6)').notNullable();
    table.string('cnjp', 14);
    table.string('nome', 100);
    table.integer('segmento_id');
    table.integer('tipo_id');
    table.decimal('valor_cota', 8, 2);
    table.decimal('dividend_yield', 5, 2);
    table.decimal('ffo_yield', 5, 2);
    table.decimal('pvp', 5, 2);
    table.decimal('liquidez', 20, 2);
    table.decimal('valor_mercado', 20, 2);
    table.timestamps(true, true);

    // chave primária
    table.primary(['ticker'], { constraintName: 'pk_fiis' });

    // chaves estrangeiras
    table
      .foreign('segmento_id', 'fk_fiis_segmento')
      .references('id')
      .inTable('fiis_segmentos')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
    table
      .foreign('tipo_id', 'fk_fiis_tipo')
      .references('id')
      .inTable('fiis_tipos')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('fiis');
}
