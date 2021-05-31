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
  const { status, response } = await getUsers();

  res.status(status).json(response);
});

RegisterRouter.get('/:nome', async (req, res) => {
  const { nome } = req.params;
  const { status, response } = await findUser(nome);

  res.status(status).json(response);
});

RegisterRouter.post('/', regValidationRules(), validateReg, async (req, res) => {
  const data = req.body;

  const { status, response } = await registerUser(data);

  res.status(status).json(response);
});

RegisterRouter.put('/', async (req, res) => {
  // Serão passados o cpf e o boolean pela request
  const data = req.body;

  const { status, response } = await approveRegistration(data);

  res.status(status).json(response);
})

module.exports = RegisterRouter;
