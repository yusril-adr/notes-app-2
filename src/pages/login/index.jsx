import React from 'react';
import {
  Box,
} from '@chakra-ui/react';

// Configuration
import CONFIG from '../../global/CONFIG';

// Components
import LoginForm from '../../components/LoginForm';

const RegisterPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" h={CONFIG.MAX_BODY_HEIGHT}>
    <LoginForm />
  </Box>
);

export default RegisterPage;