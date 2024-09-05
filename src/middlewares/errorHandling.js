import pg from 'pg';
import { AppError, InternalServerError } from '../utils/AppErrors.js';
import config from '../config/index.js';

export default (err, _req, res, _next) => {
  res.setHeader('Content-Type', 'application/problem+json');

  // erro da aplicação:
  if (err instanceof AppError) {
    console.error(err);
    res.status(err.status).json(err);
  } else {
    // se não, trata outros tipos de erro
    const error = new InternalServerError(err.message);

    if (err instanceof pg.DatabaseError) {
      error.type = 'Database Error';

      if (config.isDevelopment) {
        error.msg = err.message;
      } else {
        error.msg =
          'Verifique um possível erro de sintaxe ao tentar acessar este endpoint';
      }
    } else {
      error.type = 'Generic Error';

      if (config.isDevelopment) {
        error.msg = err.stack;
      } else {
        error.msg = 'Falha interna no servidor';
      }
    }

    console.error(error);
    res.status(500).json(error);
  }
};
