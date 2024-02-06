import React from 'react';
import {
  Box,
} from '@chakra-ui/react';

// Configuration
import CONFIG from '../../global/CONFIG';

// Components
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" h={CONFIG.MAX_BODY_HEIGHT}>
    <RegisterForm />
  </Box>
);

export default RegisterPage;
