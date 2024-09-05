// ambiente: production or development?
const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

// aplicação
const port = Number(process.env.PORT || 3000);

// postgres
const pgUser = process.env.PGUSER;
const pgPassword = process.env.PGPASSWORD;
const pgHost = process.env.PGHOST;
const pgPort = Number(process.env.PGPORT || 5432);
const pgDatabase = process.env.PGDATABASE;

export default {
  environment,
  isDevelopment,
  port,
  pgUser,
  pgPassword,
  pgHost,
  pgPort,
  pgDatabase
};
