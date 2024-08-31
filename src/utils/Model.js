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
    this.reset();
  }

  /**
   * Restaura as todas opções do modelo para o padrão.
   * @returns {Model}
   */
  reset() {
    this.#operation = '';
    this.#columns = [];
    this.#where = '';
    this.#params = [];
    return this;
  }

  /**
   * Operação SELECT
   * @param {Array<string> | string} columns O nome da(s) colunas. Pode ser um array ou uma string separada por , ; ou |
   * @returns {Model}
   */
  select(columns) {
    this.#columns = normalizeColumns(columns);
    this.#operation = 'SELECT';

    return this;
  }

  /**
   * Define a seção Where da pesquisa ou condição para exclusão/alteração
   * @param {String} condition A condição imposta
   * @param {Array} params Atribui valores para serem usados como parametros. Ex: $1, $2, ...
   * @returns {Model}
   */
  where(condition, params = []) {
    if (typeof condition !== 'string')
      throw TypeError('{condition} deve ser do tipo string');
    if (params !== undefined && !Array.isArray(params))
      throw TypeError('{params} deve ser do tipo Array');

    if (params !== undefined) {
      this.params(params);
    }

    this.#where = condition;

    return this;
  }

  /**
   * Valor de substituição de cada parâmetro. Ex: $1, $2, ...
   * @param {Array} values
   * @returns {Model}
   */
  params(values) {
    if (!Array.isArray(values))
      throw new TypeError('{values} deve ser do tipo Array');

    this.#params.push(...values);

    return this;
  }

  async exec() {
    const sql = [];

    sql.push(this.#operation);
    sql.push(this.#columns.join(', '));
    sql.push(`FROM ${this.table}`);

    if (this.#where) {
      sql.push(`WHERE ${this.#where}`);
    }

    const sqlStr = sql.join(' ');
    console.log(sqlStr);

    let result;
    if (/\$\d+/g.test(sqlStr)) {
      result = await pool.query(sqlStr, this.#params);
    } else {
      result = await pool.query(sqlStr);
    }

    this.reset();

    return result.rows;
  }
}

export default Model;
