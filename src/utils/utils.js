
/**
 * Converte o tempo universal para o timezone local.
 * @param {string} datetime 
 * @returns {string}
 */
const toLocalTimeZone = (datetime) => new Date(datetime).toLocaleString();

export default {
  toLocalTimeZone,
};
