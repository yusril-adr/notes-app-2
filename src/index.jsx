/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  ChakraProvider,
  ColorModeScript,
} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

// CSS Assets
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@fontsource/lexend/700.css';

// Config
import theme from './theme';

// Utils
import reportWebVitals from './utils/reportWebVitals';

// Components
import { NotesProvider } from './services/contexts/notes';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotesProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </NotesProvider>,
);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
