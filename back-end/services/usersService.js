const db = require('../models/db');
const { messages, status } = require('../utils');

const getUsers = async () => {
  const users = await db.any({
    text: `SELECT *, to_char(data_aprovacao, 'DD/MM/YYYY HH24:mm:ss') AS dataAprovacao
      FROM users ORDER BY nome ASC`,
    values: [],
  });

  return { status: status.OK, response: users };
};

const findUser = async (data) => {
  console.log(data);
  const user = await db.any({
    text: `SELECT *, to_char(data_aprovacao, 'DD/MM/YYYY HH24:mm:ss') AS dataAprovacao
      FROM users
      WHERE nome = $1 OR email = $1 OR cpf = $1`,
    values: [data],
  });

  return { status: status.OK, response: user };
};

const registerUser = async (data) => {
  const { nome, email, cpf, celular, conhecimentos } = data;
  const emailExists = await findUser(email);
  const cpfExists = await findUser(cpf);
  console.log('email', emailExists)
  console.log('cpf', cpfExists)

  if (emailExists.response.length === 0 && cpfExists.response.length === 0) {
    const result = await db.oneOrNone(
        'INSERT INTO users(nome, email, cpf, celular, conhecimentos) VALUES($1, $2, $3, $4, $5)',
        [nome, email, cpf, celular, conhecimentos]);

    return { status: status.CREATED, response: messages.REGISTRATION_SUCCESS };
  } else {
    return { status: status.CONFLICT, response: messages.USER_EXISTS};
  }
};

const approveRegistration = async ({ cpf, aprovado }) => {
  const { response } = await findUser(cpf);

  if (response.length > 0) {
    const approvedUser = db.none(
      `UPDATE users
        SET aprovado = $1, data_aprovacao = (current_timestamp AT TIME ZONE 'America/Sao_Paulo')
        WHERE cpf = $2;`,
      [aprovado, cpf]
    );

    return { status: status.OK, response: messages.UPDATE_SUCCESS }
  } else {
    return { status: status.NOT_FOUND, response: messages.USER_NOT_FOUND }
  }
};

module.exports = {
  registerUser,
  getUsers,
  findUser,
  approveRegistration,
}
