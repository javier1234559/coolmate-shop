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

    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
baseApi.interceptors.response.use(
  (response) => {
    // return response.data;
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.log('Unauthorized access');
    } else if (status === 404) {
      // Handle not found errors
      console.log('Not found');
    } else {
      // Handle other errors
      console.log('An error occurred');
    }

    return Promise.reject(error);
  },
);

export default baseApi;