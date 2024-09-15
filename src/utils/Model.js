import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import db from '../db/index.js';
import { updateTimeZone } from './utils.js';

export default class Model {
  /**
   * @param {string} tableName A(s) tabela(s) usada(s) nas querys
   */
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * Monta a parte inicial da query selecionando a tabela e criando joins se for o caso
   * @returns {import("knex").Knex.QueryBuilder}
   */
  table() {
    return db(this.tableName);
  }

  /**
   * @typedef {Object} QueryOptions
   * @property {string | string[] | Object} [columns]
   * @property {number} [page]
   * @property {number} [limit]
   * @property {string | number | Object} [order]
   */

  /**
   * Retorna todos os registros da tabela (pode ser aplicado um filtro)
   * @param {QueryOptions} options
   * @returns {Promise<Object[]>}
   */
  async getAll(options = {}) {
    const {
      columns = '*',
      limit,
      page,
      order,
    } = options;

    const query = this.table().select(columns);

    if (limit)
      query.limit(limit);

    if (page && limit){
      const offset = (page - 1) * limit;
      query.offset(offset);
    }

    if (order) {
      if (typeof order === 'object') {
        Object.entries(order).forEach( ([key, value]) => {
          query.orderBy(key, value);
        });     
      } else {
        query.orderBy(order);
      }
    }
    
    const result = await query;
    return camelcaseKeys(updateTimeZone(result));
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
