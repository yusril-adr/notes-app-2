import React from 'react';
import PropTypes from 'prop-types';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';

const ColorModeSwitcher = ({ styles }) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      title={`Switch to ${text} mode`}
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
