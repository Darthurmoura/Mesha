const { Router } = require('express');
const { registerUser, getUsers } = require('../services/usersService');
const { messages, status } = require('../utils');
const { regValidationRules, validateReg } = require('../middlewares/validateRegistration');

const RegisterRouter = Router();

// // services imports
// const CreateUserService = require('../services/CreateUserService');
// const UpdateUserService = require('../services/UpdateUserService');

// // middleware imports
// const {
  // validateRegistration, registrationValidationRules,
// } = require('../middlewares/validateRegistration');
// const {
//   updateValidationRules, validateUpdate,
// } = require('../middlewares/validateUpdate');

// const RegisterUser = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const { status, message } = await CreateUserService(name, email, password, role);

//   return res.status(status).json(message);
// };

// const UserUpdate = async (req, res) => {
//   const { name, email } = req.body;
//   const { status, message } = await UpdateUserService(name, email);

//   return res.status(status).json(message);
// };

// RegisterRouter
// .post(
//   '/register',
//   registrationValidationRules(),
//   validateRegistration,
//   UserCreate,
// );
// RegisterRouter
// .put('/update', updateValidationRules(), validateUpdate, UserUpdate);

RegisterRouter.get('/', async (req, res) => {
  const result = await getUsers();

  res.status(status.OK).json(result);
});

RegisterRouter.post('/', regValidationRules(), validateReg, async (req, res) => {
  const data = req.body;

  const result = await registerUser(data);
  res.status(status.CREATED).json(messages.REGISTRATION_SUCCESS);
});

module.exports = RegisterRouter;
