import React from 'react';
import {
  Box,
  SkipNavContent,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';

// Assets
import notFoundLottie from './404.json';

const NotFoundPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <SkipNavContent />
    <Lottie animationData={notFoundLottie} loop />
  </Box>
);

export default NotFoundPage;
