import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

// Services
import { useAuth } from '../../services/contexts/auth';

// Components
import LoadingPage from '../../pages/loadingPage';

const ProtectedRoutes = ({ redirectPath }) => {
  const { authData } = useAuth();

  if (authData.state !== 'idle') {
    return <LoadingPage />;
  }

  if (!authData.user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoutes.propTypes = {
  redirectPath: PropTypes.string.isRequired,
};

export default ProtectedRoutes;
