module.exports = {
  test: {
    client: 'pg',
    version: '11.5',
    connection: {
      host: '172.17.0.2',
      user: 'postgres',
      password: 'postgres',
      database: 'barriga',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
