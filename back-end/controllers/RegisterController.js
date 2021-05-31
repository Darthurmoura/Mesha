const { Router } = require('express');
const {
  registerUser,
  getUsers,
  findUser,
  approveRegistration } = require('../services/usersService');
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

RegisterRouter.get('/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const { status, message } = await findUser(cpf);

  res.status(status).json(message);
});

RegisterRouter.post('/', regValidationRules(), validateReg, async (req, res) => {
  const data = req.body;

  const { status, message } = await registerUser(data);

  res.status(status).json(message);
});

RegisterRouter.put('/', async (req, res) => {
  // Serão passados o cpf e o boolean pela request
  const data = req.body;

  const { status, message } = await approveRegistration(data);

  res.status(status).json(message);
})

module.exports = RegisterRouter;
