/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import SignupProvider from '~/components/SignUpProvider/SignupProvider';
import Skeleton from '~/components/Skeleton/Skeleton';
import useRegister from '~/hooks/useRegister';
import './Signup.css';

function SignUp() {
  const navigate = useNavigate();
  const { registerFormData, registerChange, submitregister, isLoading, setIsSubmitting, formErrors } = useRegister();

  const registerLink = () => {
    navigate('/login');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitregister();
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
                  error={formErrors['name']}
                  label={'UserName'}
                  name={'name'}
                  placeholder={'Please Enter Your UserName'}
                  value={registerFormData?.name}
                  onInputChange={(name, value) => {
                    registerChange(name, value);
                  }}
                />
              </div>
              <div className="form-group">
                <Input
                  type={'number'}
                  error={formErrors['phone']}
                  label={'Phone'}
                  name={'phone'}
                  placeholder={'Please enter your number Phone'}
                  value={registerFormData?.phone}
                  onInputChange={(name, value) => {
                    registerChange(name, value);
                  }}
                />
              </div>
              <div className="form-group">
                <Input
                  type={'email'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={registerFormData?.email}
                  onInputChange={(name, value) => {
                    registerChange(name, value);
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
                  value={registerFormData?.password}
                  onInputChange={(name, value) => {
                    registerChange(name, value);
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
              <Button variant="black">SignUp</Button>
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
