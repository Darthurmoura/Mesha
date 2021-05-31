const db = require('../models/db');
const { messages, status } = require('../utils');

const getUsers = () => {
  return db.any({
    text: 'SELECT * FROM users',
    values: [],
  });
};

const findUser = async (data) => {
  console.log(data);
  const user = await db.any({
    text: 'SELECT * FROM users WHERE email = $1 OR cpf = $1',
    values: [data],
  });

  return { status: status.OK, message: user };
};

const registerUser = async (data) => {
  const { nome, email, cpf, celular, conhecimentos } = data;
  const emailExists = await findUser(email);
  const cpfExists = await findUser(cpf);

  if (emailExists.length === 0 && cpfExists.length === 0) {
    const result = await db.oneOrNone(
        'INSERT INTO users(nome, email, cpf, celular, conhecimentos) VALUES($1, $2, $3, $4, $5)',
        [nome, email, cpf, celular, conhecimentos]);

    return { status: status.CREATED, message: messages.REGISTRATION_SUCCESS };
  } else {
    return { status: status.CONFLICT, message: messages.USER_EXISTS};
  }
};

const approveRegistration = async ({ cpf, aprovado }) => {
  const { message } = await findUser(cpf);

  if (message.length > 0) {
    const approvedUser = db.none(
      'UPDATE users SET aprovado = $1 WHERE cpf = $2', [aprovado, cpf]
    );

    return { status: status.OK, message: messages.UPDATE_SUCCESS }
  } else {
    return { status: status.NOT_FOUND, message: messages.USER_NOT_FOUND }
  }
};

module.exports = {
  registerUser,
  getUsers,
  findUser,
  approveRegistration,
}
