import authApi from '../services/authApi';
import axios from 'axios';
const axiosInstance = axios.create();

// sample data for testing purpose
export const mockUsers = [{ email: 'admin@gmail.com', password: 'Admin@123', role: 'admin' }];

const authProvider = {
  login: async ({ email, password }) => {
    /**
     * Here we actually send a request to the back end here.
     * But here we use find method since we are stored mockusers inside an array*/
    // const user = mockUsers.find((item) => item.email === email && item.password === password);

    const response = await authApi.signIn({ email, password });
    const user = response.data;

    // store the user data in local storage
    if (user) {
      // Store the user in local storage
      localStorage.setItem('auth', JSON.stringify(user));

      //https://refine.dev/docs/3.xx.xx/tutorial/understanding-authprovider/create-authprovider/
      // This sets the authorization headers on Axios instance
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${user.accessToken}`,
      };

      console.log(user.accessToken)


      return {
        success: true,
        redirectTo: '/refine',
      };
    }
    /**
     * For the wrong credentials we set success as false
     * Then we have a logging error with name
     */

    return {
      success: false,
      error: {
        message: 'Login Error',
        name: 'Invalid email or password',
      },
    };
  },

  /**
   * The check method is used to check if the user is authenticated
   */
  check: async () => {
    let user = localStorage.getItem('auth');
    user = user ? JSON.parse(user) : null;

    if (user) {
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${user.accessToken}`,
      };
      console.log(user.accessToken)

      return {
        authenticated: true,
      };
    }

    /**
     * authenticated: A boolean value indicating whether the user is authenticated or not.
     * redirectTo: A string value indicating the URL to redirect to if authentication is required.
     * logout: A boolean value indicating whether the user should be logged out.
     * error: An Error object representing any errors that may have occurred during the check
     */
    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
      error: {
        message: 'Check failed',
        name: 'Unauthorized',
      },
    };
  },
  logout: async () => {
    authApi.logout();
    localStorage.removeItem('auth');

    return {
      success: true,
      redirectTo: '/login',
    };
  },
  //  onError method is called when you get an error response from the API.
  //  You can customize with your requirements
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: '/login',
        error,
      };
    }

    return {};
  },

  // optional methods
  // register: async (params: any): AuthActionResponse,
  // forgotPassword: async (params: any): AuthActionResponse,
  // updatePassword: async (params: any): AuthActionResponse,
  getPermissions: async (params) => params?.permissions,
  getIdentity: async () => {
    let user = localStorage.getItem('auth');
    user = user ? JSON.parse(user) : null;

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar_img,
    };
  },
};

export default authProvider;
export { axiosInstance };