import axios from 'axios';
// import process from 'process';

const API_BASE_URL = 'http://localhost:8080/api';

const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

// Add a request interceptor
baseApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
baseApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      return new Promise(() => { });
    } else {
      return Promise.reject(error);
    }
  },
);

export default baseApi;