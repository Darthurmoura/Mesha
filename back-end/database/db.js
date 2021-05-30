const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: 'mangarosa',
  host: 'localhost',
  port: process.env.PGPORT,
})
console.log(process.env.PGPORT, process.env.PGUSER);
module.exports = pool;
