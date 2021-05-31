const pgp = require('pg-promise')();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const db = pgp({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: 'mangarosa',
  host: 'localhost',
  port: process.env.PGPORT,
});

module.exports = db;
