import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

function registerUser(data) { (api.post(
  '/', data,
))};

function fetchUser(nome) { api.get('/', nome) };

const apiService = { registerUser, fetchUser };

export default apiService;
