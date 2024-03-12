import { useState, useCallback } from 'react';

const useAuth = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const loginChange = useCallback((name, value) => {
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const login = useCallback(async () => {
    // Your login logic goes here
    try {
      setIsSubmitting(true);
      // Simulate an asynchronous login process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle successful login
    } catch (error) {
      // Handle login error
      setFormErrors({ login: 'Invalid email or password' });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    loginFormData,
    setIsLoading,
    loginChange,
    login,
    isLoading,
    isSubmitting,
    formErrors,
  };
};

export default useAuth;
