/* eslint-disable import/prefer-default-export */
/**
 * Remove as propriedades com valor undefined e retorna como um novo objeto
 * @param {Object} obj Um objeto
 * @returns {Object} 
 */
export function clearUndefined(obj) {
  if (typeof obj !== 'object')
    throw new TypeError('{obj} deve ser do tipo Object');

  return Object.fromEntries(
    Object.entries(obj).filter(([_pram, value]) => value !== undefined),
  );
}
