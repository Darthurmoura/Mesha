const { body, validationResult } = require('express-validator');

// Componentes de repostas http
const { status, messages } = require('../utils');

const regValidationRules = () => [
  body('email')
    .exists()
    .withMessage({ message: messages.REQUIRED_EMAIL })
    .isEmail()
    .withMessage({ message: messages.BAD_EMAIL }),
  body('cpf')
    .exists()
    .withMessage({ message: messages.REQUIRED_CPF })
    .isLength({ min: 14 })
    .matches(/^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/)
    .withMessage({ message: messages.BAD_CPF }),
  body('celular')
    .optional()
    .matches(/^\(([0-9]){2}\)\s([0-9]){5}-([0-9]){4}$/)
    .withMessage({ message: messages.BAD_CELLNUMBER }),
  body('conhecimentos')
    .exists()
    .not().isEmpty()
    .withMessage({ message: messages.REQUIRED_SKILLS }),
];

const validateReg = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errMsg = errors.errors[0].msg;

  return res.status(status.BAD_REQUEST).json(errMsg);
};

module.exports = { regValidationRules, validateReg };