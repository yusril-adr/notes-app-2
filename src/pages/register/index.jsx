import React from 'react';
import {
  Box,
  SkipNavContent,
} from '@chakra-ui/react';

// Configuration
import CONFIG from '../../global/CONFIG';

// Components
import RegisterForm from '../../components/RegisterForm';

const RegisterPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minH={CONFIG.MAX_BODY_HEIGHT}>
    <SkipNavContent />
    <RegisterForm />
  </Box>
);

export default RegisterPage;
