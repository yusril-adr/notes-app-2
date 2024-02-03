import React from 'react';
import {
  useColorModeValue,
  Container,
  Box,
  Heading,
} from '@chakra-ui/react';

// Global Components
import SearchBar from '../SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';

const AppBar = ({ onSearch, ...props }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      bg={bgColor}
      zIndex="999"
    >
      <Container
        fontSize="xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={3}
        {...props}
      >
        <Heading as="h1" size={['lg', 'xl']}>
          Notes App
        </Heading>

        <Box display="flex" alignItems="center">
          <SearchBar onSearch={onSearch} />

          <ColorModeSwitcher justifySelf="flex-end" ms="3" />
        </Box>
      </Container>
    </Box>
  );
};

export default AppBar;
