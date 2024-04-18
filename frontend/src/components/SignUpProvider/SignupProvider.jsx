import { GoogleLogin } from '@react-oauth/google';
import './SignupProvider.css';
import authApi from '~/services/authApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '~/redux/authSlice';
import { useDispatch } from 'react-redux';

const SignupProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const handleSuccess = async (credentialResponse) => {
    toast.success('Get credential response successful');
    console.log('Google login successful', credentialResponse);

    try {
      const response = await authApi.verifyAndSignIn({
        credentialToken: credentialResponse.credential,
      });

      dispatch(login(response.data));
      toast.success('Sign in successful. Redirecting to home page.');
      navigate('/'); // Use navigate to redirect
    } catch (error) {
      console.error('Sign in failed:', error);
      toast.error('Sign in failed. Please try again.');
    }
  };

  const handleError = () => {
    toast.error('Google login failed.');
  };

  return (
    <div className="signup-provider">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} flow="auth-code" useOneTap width={300} />
      {/* <a href={`${API_URL}/auth/google`} className="mb-2 google-btn">
        <GoogleLogo size={32} />
        <span className="btn-text">Login with Google</span>
      </a> */}

      {/* <a href={`${API_URL}/auth/facebook`} className="facebook-btn">
        <FacebookLogo size={32} />
        <span className="btn-text">Login with Facebook</span>
      </a> */}
    </div>
  );
};

export default SignupProvider;
