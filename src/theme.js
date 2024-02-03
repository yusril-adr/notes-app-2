import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Lexend, sans-serif',
    body: 'Lexend, sans-serif',
  },
  config: {
    initialColorMode: window.localStorage.getItem('chakra-ui-color-mode') || 'light',
  },
});

export default theme;
