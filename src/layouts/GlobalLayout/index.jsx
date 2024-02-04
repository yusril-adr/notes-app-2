import React from 'react';
import {
  Container,
} from '@chakra-ui/react';
import { SkipNavLink } from '@chakra-ui/skip-nav';
import {
  Outlet,
} from 'react-router-dom';

// Global Components
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';

const GlobalLayout = () => (
  <>
    <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>
    <AppBar styles={{ maxW: '8xl' }} />

    <Container as="main" maxW="8xl" minH="calc(100vh - 283px)">
      <Outlet />
    </Container>

    <Footer styles={{ my: '16' }} />
  </>
);

export default GlobalLayout;
