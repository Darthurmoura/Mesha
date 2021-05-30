const db = require('./db');

async function createTable() {
  const results = await db.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(20) NOT NULL,
    aprovado BOOLEAN DEFAULT False,
    conhecimentos VARCHAR(100)[] NOT NULL,
    data_aprovacao DATE
  )
  `);

  return results;
}

createTable();
