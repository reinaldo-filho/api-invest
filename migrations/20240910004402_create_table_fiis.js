/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('fiis', (table) => {
      table.specificType('ticker', 'char(6)').notNullable();
      table.string('cnpj', 14);
      table.string('nome', 100);
      table.integer('segmento_id');
      table.integer('tipo_id');
      table.decimal('valor_cota', 8, 2);
      table.decimal('dividend_yield', 5, 2);
      table.decimal('ffo_yield', 5, 2);
      table.decimal('pvp', 5, 2);
      table.decimal('liquidez', 20, 2);
      table.decimal('valor_mercado', 20, 2);
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());

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
    })
    .then(() =>
      // trigger para atualizar updated_at ao editar o registro
      knex.schema.raw(`
      CREATE TRIGGER update_user_timestamp
      BEFORE UPDATE ON fiis
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();
      `),
    );
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .raw(`DROP TRIGGER IF EXISTS update_user_timestamp ON fiis`)
    .then(() => knex.schema.dropTable('fiis'));
}
