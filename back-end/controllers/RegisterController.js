const { Router } = require('express');
const {
  registerUser,
  getUsers,
  findUser,
  approveRegistration } = require('../services/usersService');
const { regValidationRules, validateReg } = require('../middlewares/validateRegistration');

const RegisterRouter = Router();

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
  const data = req.body;

  const { status, response } = await approveRegistration(data);

  res.status(status).json(response);
})

module.exports = RegisterRouter;
