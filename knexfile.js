/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'pg',
    connection: {
      host: '192.168.0.2',
      user: 'investimentos',
      password: 'investimentos',
      database: 'investimentos',
    },
    migrations: {
      directory: './migrations',
    },
  },
};
