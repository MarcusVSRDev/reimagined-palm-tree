import axios from 'axios';
import { getToken } from './utils';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = token ? `Token ${token}` : null;

  return config;
});
