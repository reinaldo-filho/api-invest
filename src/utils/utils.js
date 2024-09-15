/* eslint-disable import/prefer-default-export */

/**
 * Verifica se a sigla é um ticker válido
 * @param {string} ticker
 * @returns {boolean}
 */
export function tickerIsValid(ticker) {
  return /[a-z]{4}11$/i.test(ticker);
}

/**
 * Converte o tempo universal para o timezone local nos capos created_at e updated_at.
 * @param {Object[]} records Array com os registros recuperados do banco de dados 
 * @returns {Object[]}
 */
export function updateTimeZone (records) {
  return records.map((row) => {
    const result = row;
    if (row.created_at) result.created_at = new Date(row.created_at).toLocaleString();
    if (row.updated_at) result.updated_at = new Date(row.updated_at).toLocaleString();
    return result;
  });  
}
