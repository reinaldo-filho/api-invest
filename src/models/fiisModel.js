import db from '../db/index.js';
import { updateTimeZone } from '../utils/utils.js';

class FiisModel {
  constructor() {
    this.table = 'fiis';
  }

  query() {
    return db(this.table);
  }

  async getAll() {
    const result = await this.query().select('*').orderBy('ticker');
    return updateTimeZone(result);
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
