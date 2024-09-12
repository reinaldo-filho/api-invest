import db from '../db/index.js';
import { updateTimeZone } from '../utils/utils.js';

class FiisModel {
  constructor() {
    this.table = 'fiis';
  }

  query() {
    return db(this.table);
  }

<<<<<<< HEAD
  async getAll() {
    const result = await this.query().select('*').orderBy('ticker');
    return updateTimeZone(result);
=======
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
>>>>>>> d03d1d36bde9e15d26ad7d61d56ca5118441b029
  }

  async getOne(ticker) {
    const result = await this.query().select('*').where({ ticker }).first();
    return updateTimeZone(result);
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
