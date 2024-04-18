/* eslint-disable react/prop-types */
import Skeleton from '~/components/Skeleton/Skeleton';
import { Link } from 'react-router-dom';
import SignupProvider from '~/components/SignUpProvider/SignupProvider';
import Button from '~/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input/Input';
import useLogin from '~/hooks/useLogin';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { loginFormData, loginChange, submitLogin, isLoading, isSubmitting, setIsSubmitting, formErrors } = useLogin();

  const registerLink = () => {
    navigate('/signup');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitLogin();
  };

  return (
    <div className="container">
      <div className="login-form">
        {isLoading && <Skeleton />}
        <h2 className="form-title">Login</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate className="lo ">
          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <Input
                  type={'email'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={loginFormData?.email}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
              </div>
              <div className="form-group">
                <Input
                  type={'password'}
                  error={formErrors['password']}
                  label={'Password'}
                  name={'password'}
                  placeholder={'Please Enter Your Password'}
                  value={loginFormData?.password}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
              </div>
            </div>
            <div className="signup-col">
              <SignupProvider />
            </div>
          </div>
          <hr />
          <div className="button-group">
            <div className="button-container">
              <Button variant={isSubmitting ? 'white' : 'black'}>
                Login
              </Button>
              <Button variant="white" onClick={registerLink} className="ml-4">
                Create an account
              </Button>
            </div>
            <Link className="forgot-password-link" to={'/forgot-password'}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
