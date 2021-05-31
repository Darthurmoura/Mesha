const db = require('./db');

async function createTable() {
  const results = await db.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    celular VARCHAR(15),
    conhecimentos VARCHAR(100)[] NOT NULL,
    aprovado BOOLEAN DEFAULT False,
    data_aprovacao DATE
  )
  `);

  return results;
}

createTable();
