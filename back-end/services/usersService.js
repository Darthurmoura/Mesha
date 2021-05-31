const db = require('../models/db');

async function registerUser(data) {
  const { nome, email, cpf, celular, conhecimentos } = data;
  const result = await db.oneOrNone(
      'INSERT INTO users(nome, email, cpf, celular, conhecimentos) VALUES($1, $2, $3, $4, $5)',
      [nome, email, cpf, celular, conhecimentos]);

  return result;
}

const getUsers = () => {
  return db.query('SELECT * FROM users');
};

module.exports = {
  registerUser,
  getUsers,
}
