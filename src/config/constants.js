// ambiente: production or development?
const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

// aplicação
const port = (process.env.PORT || 3000);

/**
 * @param {number}
 */
export default {
  environment,
  isDevelopment,
  port,
};
