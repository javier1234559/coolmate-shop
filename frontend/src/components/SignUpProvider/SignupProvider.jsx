import { API_URL } from '~/constants';
import './SignupProvider.css';
import { GoogleLogo ,FacebookLogo } from 'phosphor-react';

const SignupProvider = () => {
  return (
    <div className="signup-provider">
      <a href={`${API_URL}/auth/google`} className="mb-2 google-btn">
        <GoogleLogo size={32} />
        <span className="btn-text">Login with Google</span>
      </a>

      <a href={`${API_URL}/auth/facebook`} className="facebook-btn">
        <FacebookLogo size={32} />
        <span className="btn-text">Login with Facebook</span>
      </a>
    </div>
  );
};

export default SignupProvider;
