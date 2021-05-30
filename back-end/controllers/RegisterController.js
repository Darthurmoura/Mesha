const { Router } = require('express');

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

module.exports = RegisterRouter;
