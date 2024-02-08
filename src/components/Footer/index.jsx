import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Footer = ({ styles }) => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <Box
      {...styles}
      as="footer"
      textAlign="center"
    >
      <Text>
        © Yusril A. P. {year} {t('All rights reserved')}
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
