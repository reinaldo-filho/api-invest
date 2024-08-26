import { AppError, InternalServerError } from '../utils/AppErrors.js';
import config from '../config/constants.js';

export default (err, _req, res, _next) => {
  console.error(err);

  res.setHeader('Content-Type', 'application/problem+json');

  if (err instanceof AppError) {
    res.status(err.status).json(err);
  } else {
    let detail = '';
    if (config.isDevelopment) {
      detail = err.stack;
    } else {
      detail = 'Erro interno no servidor.';
    }

    res.status(500).json(new InternalServerError(detail));
  }
};
