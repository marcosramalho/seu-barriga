const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: process.env.HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
