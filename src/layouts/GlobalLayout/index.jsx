import React from 'react';
import {
  Container,
} from '@chakra-ui/react';
import { SkipNavLink } from '@chakra-ui/skip-nav';
import {
  Outlet,
} from 'react-router-dom';

// Configs
import CONFIG from '../../global/CONFIG';

// Global Components
import AppBar from '../../components/AppBar';
import Footer from '../../components/Footer';

const GlobalLayout = () => (
  <>
    <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>
    <AppBar styles={{ maxW: '8xl' }} />

    <Container as="main" maxW="8xl" minH={CONFIG.MAX_BODY_HEIGHT}>
      <Outlet />
    </Container>

    <Footer styles={{ my: '16' }} />
  </>
);

export default GlobalLayout;
