import { useState } from 'react';

const usePasswordVisibility = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    password,
    showPassword,
    handlePasswordChange,
    togglePasswordVisibility,
  };
};

export default usePasswordVisibility;