import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

function registerUser(data) { (api.post(
  '/', data,
))};

function getUsers() {
  const users = api.get('/');
  return users;
};

function getUser(nome) {
  const user = api.get(`/${nome}`);
  return user;
};

function updateUser(nome) { (api.put(
  '/', nome,
))};

const apiService = { registerUser, getUsers, getUser, updateUser };

export default apiService;
