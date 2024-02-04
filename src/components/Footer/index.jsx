import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Text,
} from '@chakra-ui/react';

const Footer = ({ styles }) => {
  const year = new Date().getFullYear();

  return (
    <Box
      {...styles}
      as="footer"
      textAlign="center"
    >
      <Text>
        © Yusril A. P. {year} All rights reserved
      </Text>
    </Box>
  );
};

Footer.defaultProps = {
  styles: {},
};

Footer.propTypes = {
  styles: PropTypes.object,
};

export default Footer;
