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
  #params;

  constructor(table) {
    this.table = table;
  }

  /**
   * Restaura as todas opções do modelo para o padrão.
   * @returns {Model}
   */
  reset() {
    this.#operation = '';
    this.#columns = [];
    this.#where = '';
    this.#params = null;    
    return this;
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
  where(condition, params) {
    if (params.length > 0) {
      this.params(params);
    }

    if (condition) {
      this.#where = condition;
    }

    return this;
  }

  /**
   * Valor de substituição de cada parâmetro. Ex: $1, $2, ...
   * @param {Array | *} values
   * @returns {Model}
   */
  params(values) {
    if (Array.isArray(values)) {
      if (values.length === 0) return this;
      this.#params.push(...values);
    } else {
      this.#params.push(values);
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

    const { rows } = await pool.query(sql.join(' '), ...this.#params);
    this.reset();

    return rows;
  }
}

export default Model;
