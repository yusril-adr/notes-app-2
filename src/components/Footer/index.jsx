import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';

const Footer = (props) => {
  const year = new Date().getFullYear();

  return (
    <Box
      {...props}
      as="footer"
      textAlign="center"
    >
      <Text>
        © Yusril A. P. {year} All rights reserved
      </Text>
    </Box>
  );
};

export default Footer;
