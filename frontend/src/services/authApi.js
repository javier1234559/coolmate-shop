import baseApi from "./baseApi";

const authApi = {
  async verifyAndSignIn(payload) {
    // send credential token to verify and signin
    return baseApi.post('/auth/google/verify', payload);
  },

  async logout() {
    return baseApi.get('auth/logout');
  },

  async signIn(payload) {
    try {
      const response = await baseApi.post('auth/login', payload);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('An error occurred during login.');
      }
    }
  },

  async register(payload) {
    // Assuming userData is an object containing user registration information
    return baseApi.post('auth/register', payload);
  },

  async getIdentity() {
    return baseApi.get('auth/me');
  }
  
}

export default authApi;