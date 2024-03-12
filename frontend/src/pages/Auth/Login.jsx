/* eslint-disable react/prop-types */
import Skeleton from '~/components/Skeleton/Skeleton';
import { Link } from 'react-router-dom';
import SignupProvider from '~/components/SignUpProvider/SignupProvider';
import Button from '~/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input/Input';
import useAuth from '~/hooks/useAuth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { loginFormData, loginChange, login, isLoading, isSubmitting, formErrors } = useAuth();

  const registerLink = () => {
    navigate('/register');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="login-form">
      {isLoading && <Skeleton />}
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit} noValidate className="login-form">
        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="emailInput">Email Address</label>
              <Input
                type={'text'}
                error={formErrors['email']}
                label={'Email Address'}
                name={'email'}
                placeholder={'Please Enter Your Email'}
                value={loginFormData?.email}
                onInputChange={(name, value) => {
                  loginChange(name, value);
                }}
              />
              {/* <input type="text" className={formErrors['email'] ? 'error' : ''} id="emailInput" name="email" placeholder="Please Enter Your Email" value={loginFormData.email} onChange={(e) => loginChange(e.target.name, e.target.value)} />
              {formErrors['email'] && <span className="error-message">{formErrors['email']}</span>} */}
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
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
              {/* <input type="password" className={formErrors['password'] ? 'error' : ''} id="passwordInput" name="password" placeholder="Please Enter Your Password" value={loginFormData.password} onChange={(e) => loginChange(e.target.name, e.target.value)} />
              {formErrors['password'] && <span className="error-message">{formErrors['password']}</span>} */}
            </div>
          </div>
          <div className="signup-col">
            <SignupProvider />
          </div>
        </div>
        <hr />
        <div className="button-group">
          <div className="button-container">
            <Button variant="black" onClick={isSubmitting}>
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
  );
}

export default Login;
