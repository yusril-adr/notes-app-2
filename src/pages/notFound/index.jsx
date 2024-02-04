import React from 'react';
import {
  Box,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';

// Assets
import notFoundLottie from './404.json';

const NotFoundPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <Lottie animationData={notFoundLottie} loop />
  </Box>
);

export default NotFoundPage;
