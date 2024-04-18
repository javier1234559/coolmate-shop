import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '~/redux/authSlice';
import authApi from '~/services/authApi';
import toast from 'react-hot-toast';


const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isStrongPass = (pass) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);

  const loginChange = useCallback((name, value) => {
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'email') {
      if (!isEmail(value)) {
        setFormErrors(prevErrors => ({ ...prevErrors, email: 'Please enter a valid email address' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, email: undefined }));
      }
    } else if (name === 'password') {
      if (!isStrongPass(value)) {
        setFormErrors(prevErrors => ({ ...prevErrors, password: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, password: undefined }));
      }
    }
  }, []);

  const submitLogin = useCallback(async () => {
    try {
      const response = await authApi.signIn(loginFormData);
      const { name, email, avatar_img, accessToken, role } = response.data;
      console.log(response.data)
      //  // Dispatch the loginSuccess action to update the Redux store
      const user = {
        name: name,
        email: email,
        avatar_img: avatar_img,
        accessToken: accessToken,
        role: role,
      };
      dispatch(login(user));
      toast.success(response?.data?.message);

      // Navigate based on the user's role
      if (response?.data.role == 'admin') {
        navigate('/refine');
      } else {
        navigate('/');
      }

    } catch (error) {
      toast.error(error?.response?.data?.message);
      setFormErrors({ email: error.message, password: error.message });
      
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, loginFormData, navigate]);

  return {
    loginFormData,
    setIsLoading,
    loginChange,
    submitLogin,
    isLoading,
    isSubmitting,
    setIsSubmitting,
    formErrors,
  };
};

export default useLogin;
