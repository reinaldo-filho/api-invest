import db from '../db/index.js';

class FiisModel {
  constructor() {
    this.table = 'fiis';
  }

  query() {
    return db(this.table);
  }

  /**
   * @typedef {Object} Options 
   * @property {number} [page]
   * @property {number} [limit]
   * @returns 
   */


  /**
   * 
   * @param {Options} options 
   * @returns 
   */
  getAll(options = {}) {
    return this.query().select('*').orderBy('ticker');
  }

  getOne(ticker) {
    return this.query().select('*').where({ ticker }).first();
  }

  create(data) {
    return this.query().insert(data).returning('*');
  }

  update(ticker, data) {
    return this.query().where({ ticker }).update(data).returning('*');
  }

  remove(ticker) {
    return this.query().where({ ticker }).del();
  }
}

const model = new FiisModel();

export default model;
