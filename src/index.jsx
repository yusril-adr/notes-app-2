/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  ChakraProvider,
  ColorModeScript,
} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import theme from './theme';
import App from './App';

// CSS Assets
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';

// Utils
import reportWebVitals from './utils/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript />
    <App />
  </ChakraProvider>,
);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
