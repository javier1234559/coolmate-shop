// sample data for testing purpose
export const mockUsers = [
  { email: 'john@mail.com', password: '123', role: 'admin' },
];

const authProvider = {
  login: async ({ email, password }) => {
    /**
     * Here we actually send a request to the back end here.
     * But here we use find method since we are stored mockusers inside an array*/
    const user = mockUsers.find((item) => item.email === email && item.password === password);

    // store the user data in local storage
    if (user) {
      localStorage.setItem('auth', JSON.stringify(user));
      /**
       * If process has completed we need to set success as true
       * Also you need to provide an url to be redirected after successful login
       * Here we use '/blog-posts'
       */
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
    const user = localStorage.getItem('auth');

    if (user) {
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
    // remove the uer from local storage
    localStorage.removeItem('auth');
    /**
     * After logout, success variable need t set as true
     * In here, we redirect user to the login page after logging out
     */
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
  // getPermissions: async (params: any): unknown,
  // getIdentity: async (params: any): unknown,
};

export default authProvider;
