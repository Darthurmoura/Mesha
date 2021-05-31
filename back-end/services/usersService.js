const db = require('../models/db');

const getUsers = () => {
  return db.any({
    text: 'SELECT * FROM users',
    values: [],
  });
};

async function registerUser(data) {
  const { nome, email, cpf, celular, conhecimentos } = data;
  const result = await db.oneOrNone(
      'INSERT INTO users(nome, email, cpf, celular, conhecimentos) VALUES($1, $2, $3, $4, $5)',
      [nome, email, cpf, celular, conhecimentos]);

  return result;
}


module.exports = {
  registerUser,
  getUsers,
}
