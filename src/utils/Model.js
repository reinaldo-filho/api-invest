import pool from '../db/pool.js';

function normalizeColumns(columns) {
  if (Array.isArray(columns)) {
    return columns;
  }
  if (typeof columns === 'string') {
    return columns.split(/[,;|]/).map((column) => column.trim());
  }
  return ['*'];
}

class Model {
  #operation;
  #columns;
  #where;

  constructor(table) {
    this.table = table;
  }

  /**
   * Operação SELECT
   * @param {Array<string> | string} columns O nome da(s) colunas. Pode ser um array ou uma string separada por , ; ou |
   * @returns {Model}
   */
  select(columns) {
    this.#operation = 'SELECT';
    this.#columns = normalizeColumns(columns);

    return this;
  }

  /**
   * Define a seção Where da pesquisa ou condição para exclusão/alteração
   * @param {string} condition A condição imposta
   * @returns {Model}
   */
  where(condition) {
    if (condition) {
      this.#where = condition;
    }

    return this;
  }

  async exec() {
    const sql = [];

    sql.push(this.#operation);
    sql.push(this.#columns.join(', '));
    sql.push(`FROM ${this.table}`);

    if (this.#where) {
      sql.push(this.#where);
    }

    const { rows } = await pool.query(sql.join(' '));

    return rows;
  }
}

export default Model;
