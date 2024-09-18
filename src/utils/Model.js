import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
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
   * Retorna todos os registros da tabela
   * @param {QueryOptions} options Opções passadas pela query do endereço http
   * @returns {Promise<Object[] | undefined>} Retorna um array de objetos com os pares coluna/valor ou undefined
   */
  async getAll(options = {}) {
    const { columns = '*', limit, page, order } = options;

    const query = this.table().select(columns);

    if (limit) query.limit(limit);

    if (page && limit) {
      const offset = (page - 1) * limit;
      query.offset(offset);
    }

    if (order) {
      if (typeof order === 'object') {
        Object.entries(order).forEach(([key, value]) => {
          query.orderBy(key, value);
        });
      } else {
        query.orderBy(order);
      }
    }

    return camelcaseKeys(await query);
  }

  /**
   * Retorna um único registro do banco de dados
   * @param {Object} filter Um objeto com pares coluna/valor para ser usado na clausula where
   * @returns {Promise<Object[] | undefined>} Retorna um array de objetos com os pares coluna/valor ou undefined
   */
  async getOne(filter) {
    if (!(typeof filter === 'object') || filter === null)
      throw new TypeError('{filtro} deve ser do tipo Object.');

    return camelcaseKeys(await this.table().select('*').where(filter).first());
  }

  /**
   * Cria um novo registro no banco de dados
   * @param {Object} data Objeto com par coluna/valor a ser inserido.
   * @param {boolean} [returnData] Se true (padrão), retorna os dados inseridos.
   * @returns {Promise<Object[]>} Retorna um array com os registros inseridos ou [] se returnData = false
   */
  async create(data, returnData = true) {
    const query = this.table().insert(decamelizeKeys(data));

    if (returnData) query.returning('*');

    const result = await query;
    return returnData ? result : [];
  }

  /**
   * Altera os registro conforme filtro aplicado
   * @param {Object} key Um objeto com pares coluna/valor para ser usado na clausula where
   * @param {Object} data Objeto com par coluna/valor a ser inserido.
   * @param {boolean} [returnData] Se true (padrão), retorna os dados alterados.
   * @returns {Promise<Object[]>} Retorna um array com os registros alterados ou [] se returnData = false.
   */
  async update(key, data, returnData = true) {
    const query = this.table().where(key);

    if (returnData) {
      query.update(decamelizeKeys(data), '*');
    } else {
      query.update(decamelizeKeys(data));
    }

    const result = await query;
    return returnData ? result : [];
  }

  remove(ticker) {
    return this.table().where({ ticker }).del();
  }
}
