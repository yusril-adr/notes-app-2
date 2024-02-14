import React from 'react';
import {
  Box,
  SkipNavContent,
} from '@chakra-ui/react';

// Configuration
import CONFIG from '../../global/CONFIG';

// Components
import LoginForm from '../../components/LoginForm';

const RegisterPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" h={CONFIG.MAX_BODY_HEIGHT}>
    <SkipNavContent />
    <LoginForm />
  </Box>
);

export default RegisterPage;
