import React from 'react';
import PropTypes from 'prop-types';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

const ColorModeSwitcher = ({ styles }) => {
  const { t } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue(t('dark'), t('light'));
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={t('Switch to {{theme}} mode', { theme: text })}
      title={t('Switch to {{theme}} mode', { theme: text })}
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...styles}
    />
  );
};

ColorModeSwitcher.defaultProps = {
  styles: {},
};

ColorModeSwitcher.propTypes = {
  styles: PropTypes.object,
};

export default ColorModeSwitcher;
