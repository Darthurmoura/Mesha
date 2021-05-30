const express = require('express');
const rescue = require('express-rescue');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = 3001;

// Controller imports
const RegisterController = require('./controllers/RegisterController');

app.use(express.json());
app.use(cors());

app.use('/:username/register', rescue(RegisterController));

// app.use((error, req, res, _next) => {
//   console.log({ error });
//   return res.status(erro).json(erroInterno);
// });

app.listen(PORT, () => console.log('Example app listening on port:', PORT));
