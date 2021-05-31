const db = require('./db');

async function createTable() {
  const results = await db.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    celular VARCHAR(15),
    conhecimentos VARCHAR(100)[] NOT NULL,
    aprovado BOOLEAN DEFAULT False,
    data_aprovacao TIMESTAMP
  )
  `);

  return results;
}

createTable();
