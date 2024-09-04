/* eslint-disable max-classes-per-file */
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

/**
 * Classe de configuração para ser usada nas querys
 */
class QueryConfig {
  constructor(text, values) {
    this.text = text;
    this.values = values;
  }
}

/**
 * Classe base para todos os modelos de dados
 */
class Model {
  #operation;
  #selectColumns;
  #whereCondition;
  #whereParams;
  #insertColumns;
  #insertValues;

  constructor(table) {
    this.table = table;
    this.reset();
  }

  #buildSQLSelect() {
    const sql = [];

    sql.push(`SELECT ${this.#selectColumns.join(', ')}`);
    sql.push(`FROM ${this.table}`);

    if (this.#whereCondition) sql.push(`WHERE ${this.#whereCondition}`);

    const text = sql.join(' ');
    const values = this.#whereParams;

    return new QueryConfig(text, values);
  }

  #buildSQLInsert() {
    const sql = [];

    sql.push(`INSERT INTO ${this.table}`);

    if (this.#insertColumns.length > 0)
      sql.push(`(${this.#insertColumns.join(', ')})`);

    const params = [];
    for (let i = 1; i <= this.#insertValues.length; i += 1) params.push(`$${i}`);
    sql.push(`VALUES (${params.join(', ')})`);

    const text = sql.join(' ');
    const values = this.#insertValues;

    return new QueryConfig(text, values);
  }

  /**
   * Restaura as todas opções do modelo para o padrão.
   * @returns {Model}
   */
  reset() {
    this.#operation = '';
    this.#selectColumns = [];
    this.#whereCondition = '';
    this.#whereParams = [];
    this.#insertColumns = [];
    this.#insertValues = [];
    return this;
  }

  /**
   * Operação SELECT
   * @param {string | string[]} [columns] O nome da(s) colunas. Pode ser um array ou uma string separada por , ; ou |
   * @returns {Model}
   */
  select(columns) {
    this.#selectColumns = normalizeColumns(columns);
    this.#operation = 'SELECT';

    return this;
  }

  /**
   * Operação INSERT
   * @param {Object| any[]} values Objeto pares "coluna = valor" ou um Array de valores (caso não for informar as colunas)
   * @returns {Model}
   */
  insert(values) {
    if (!(values instanceof Object))
      throw new TypeError(
        '{values} deve ser um objeto com pares "columna = valor" ou um Array de valores',
      );

    if (Array.isArray(values)) {
      this.#insertValues.push(values);
    } else {
      Object.keys(values).forEach((property) => {
        this.#insertColumns.push(property);
        this.#insertValues.push(values[property]);
      });
    }

    this.#operation = 'INSERT';

    return this;
  }

  /**
   * Define a seção Where da pesquisa ou condição para exclusão/alteração
   * @param {string} condition A condição imposta
   * @param {any[]} [params] Atribui valores para serem usados como parametros. Ex: $1, $2, ...
   * @returns {Model}
   */
  where(condition, params) {
    if (typeof condition !== 'string')
      throw TypeError('{condition} deve ser do tipo string');
    if (params !== undefined && !Array.isArray(params))
      throw TypeError('{params} deve ser do tipo Array');

    this.#whereCondition = condition;
    if (params) {
      this.#whereParams = params;
    }

    return this;
  }

  /**
   * Executa a operação com os parâmetros previamente configurados
   * @returns {Promise<Object[]>} Retorna as linhas do banco ou um array vazio dependendo de cada operação
   */
  async exec() {
    let query = new QueryConfig();

    switch (this.#operation) {
      case 'SELECT':
        query = this.#buildSQLSelect();
        break;
      case 'INSERT':
        query = this.#buildSQLInsert();
        break;
      default:
        break;
    }

    // limpa todas as configurações antes de realizar a query
    // caso um erro ocorra, todas as conf. já estarão limpas
    this.reset();

    console.info('Executando query: ', query);
    const result = await pool.query(query);

    return result.rows;
  }
}

export default Model;
