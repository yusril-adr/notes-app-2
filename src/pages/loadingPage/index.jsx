import React from 'react';
import { Box, Spinner, SkipNavContent } from '@chakra-ui/react';

// Configuration
import CONFIG from '../../global/CONFIG';

const LoadingPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" h={CONFIG.MAX_BODY_HEIGHT}>
    <SkipNavContent />
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
);

export default LoadingPage;
