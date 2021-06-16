import axios from 'axios';

const api = axios.create({
  baseURL: '18.188.171.3:3333',
});

export default api;