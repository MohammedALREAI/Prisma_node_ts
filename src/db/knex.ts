import Knex from 'knex';

const knex = Knex({
  client: 'mssql',
  connection: {
    server: process.env.CENTURION_MSSQL_HOST,
    user: process.env.CENTURION_MSSQL_USER,
    password: process.env.CENTURION_MSSQL_PASSWORD,
    database: process.env.CENTURION_MSSQL_DATABASE,
    port: 1433,
    options: {
      encrypt: true
    }
  }
});

export default knex;
