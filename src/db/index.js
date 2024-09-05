import knex from 'knex';
import config from '../config/index.js';

const connection = knex({
  client: 'pg',
  connection: {
    host: config.pgHost,
    port: config.pgPort,
    user: config.pgUser,
    database: config.pgDatabase,
    password: config.pgPassword,
  },
  pool: { min: 0, max: 7 },
});

export default connection;
