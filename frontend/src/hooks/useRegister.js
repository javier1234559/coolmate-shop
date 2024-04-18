import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '~/services/authApi';
import toast from 'react-hot-toast';

const useRegister = () => {
  const navigate = useNavigate();
  const [registerFormData, setregisterFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isStrongPass = (pass) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);

  const registerChange = useCallback((name, value) => {
    setregisterFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const submitregister = useCallback(async () => {
    try {
      const response = await authApi.register(registerFormData);
      toast.success(response?.data?.message);
      navigate('/login');

    } catch (error) {
      toast.error(error?.response?.data?.message);
      setFormErrors({ email: error.message, password: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }, [registerFormData, navigate]);

  return {
    registerFormData,
    setIsLoading,
    registerChange,
    submitregister,
    isLoading,
    isSubmitting,
    setIsSubmitting,
    formErrors,
  };
};

export default useRegister;
