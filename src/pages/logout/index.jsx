import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// Services
import { useAuth } from '../../services/contexts/auth';

const LogOutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (<Navigate to="/" />);
};

export default LogOutPage;
