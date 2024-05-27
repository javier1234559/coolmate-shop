import axios from 'axios';
import toast from 'react-hot-toast';
import { store } from '~/redux/store';

const API_BASE_URL = 'https://backend-coolmate.fly.dev/api';

const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

// Add a request interceptor
baseApi.interceptors.request.use(
  (config) => {

    const state = store.getState(); // get the current state
    const token = state?.auth?.accessToken; // get the token from the state

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      toast.error(error.response.data.message);
      console.error(error.response.data);
    } else if (status === 404) {
      // Handle not found errors
      toast.error(error.response.data.message);
      console.error(error.response.data);
    } else {
      // Handle other errors
      toast.error(error.response.data.message);
      console.error(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default baseApi;