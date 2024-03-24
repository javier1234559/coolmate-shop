/* eslint-disable react/prop-types */
import Skeleton from '~/components/Skeleton/Skeleton';
import { Link } from 'react-router-dom';
import SignupProvider from '~/components/SignUpProvider/SignupProvider';
import Button from '~/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/Input/Input';
import useAuth from '~/hooks/useAuth';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const { signupFormData, signupChange, signup, isLoading, isSubmitting, formErrors } = useAuth();

  const registerLink = () => {
    navigate('/login');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className="container">
      <div className="signup-form">
        {isLoading && <Skeleton />}
        <h2 className="form-title">Sign Up</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate className="lo ">
          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={signupFormData?.email}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
                {/* <input type="text" className={formErrors['email'] ? 'error' : ''} id="emailInput" name="email" placeholder="Please Enter Your Email" value={signupFormData.email} onChange={(e) => signupChange(e.target.name, e.target.value)} />
                {formErrors['email'] && <span className="error-message">{formErrors['email']}</span>} */}
              </div>

              <div className="form-group">
                <Input
                  type={'text'}
                  error={formErrors['firstname']}
                  label={'First Name'}
                  name={'firstname'}
                  placeholder={'Please Enter Your Firstname'}
                  value={signupFormData?.firstname}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
                {/* <input type="password" className={formErrors['password'] ? 'error' : ''} id="passwordInput" name="password" placeholder="Please Enter Your Password" value={signupFormData.password} onChange={(e) => signupChange(e.target.name, e.target.value)} />
                {formErrors['password'] && <span className="error-message">{formErrors['password']}</span>} */}
              </div>
              <div className="form-group">
                <Input
                  type={'text'}
                  error={formErrors['lastname']}
                  label={'Last Name'}
                  name={'lastname'}
                  placeholder={'Please Enter Your Last Name'}
                  value={signupFormData?.lastname}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
                {/* <input type="password" className={formErrors['password'] ? 'error' : ''} id="passwordInput" name="password" placeholder="Please Enter Your Password" value={signupFormData.password} onChange={(e) => signupChange(e.target.name, e.target.value)} />
                {formErrors['password'] && <span className="error-message">{formErrors['password']}</span>} */}
              </div>
              <div className="form-group">
                <Input
                  type={'password'}
                  error={formErrors['password']}
                  label={'Password'}
                  name={'password'}
                  placeholder={'Please Enter Your Password'}
                  value={signupFormData?.password}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
                {/* <input type="password" className={formErrors['password'] ? 'error' : ''} id="passwordInput" name="password" placeholder="Please Enter Your Password" value={signupFormData.password} onChange={(e) => signupChange(e.target.name, e.target.value)} />
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
                SignUp
              </Button>
              <Button variant="white" onClick={registerLink} className="ml-4">
                Already have account
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

export default SignUp;
