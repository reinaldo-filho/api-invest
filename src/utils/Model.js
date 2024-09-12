import db from '../db/index.js';

export default class Model {
  /**
   * @param {string} tableName A(s) tabela(s) usada(s) nas querys
   */
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * Monta a parte inicial da query selecionando a tabela e criando joins se for o caso
   * @returns {import("knex").Knex.QueryBuilder<any, any>}
   */
  table() {
    return db(this.tableName);
  }

  /**
   * @typedef {Object} FilterOptions
   * @property {number} [page]
   * @property {number} [limit]
   */

  /**
   * Retorna todos os registros da tabela (pode ser aplicado um filtro)
   * @param {FilterOptions} options
   * @returns
   */
  getAll(options = {}) {
    return this.table().select('*').orderBy('ticker');
  }

  getOne(ticker) {
    return this.table().select('*').where({ ticker }).first();
  }

  create(data) {
    return this.table().insert(data).returning('*');
  }

  update(ticker, data) {
    return this.table().where({ ticker }).update(data).returning('*');
  }

  remove(ticker) {
    return this.table().where({ ticker }).del();
  }
}
