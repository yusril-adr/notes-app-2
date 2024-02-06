import React, {
  useContext,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  useColorModeValue,
  Container,
  Box,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import {
  LockIcon,
  RepeatIcon,
  UnlockIcon,
} from '@chakra-ui/icons';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

//  Components
import SearchBar from '../SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';

// Services
import { NotesContext } from '../../services/contexts/notes';

const AppBar = ({ styles }) => {
  const { initNotes, resetNotes } = useContext(NotesContext);
  const bgColor = useColorModeValue('white', 'gray.800');
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const isArchivedPage = useMemo(() => (
    location.pathname === '/archives'
  ), [location]);

  const isNotesPage = useMemo(() => (
    location.pathname === '/archives'
    || location.pathname === '/notes'
  ), [location]);

  useEffect(() => {
    initNotes();
  }, []);

  const onRefreshHandler = () => {
    setSearchParams();
    resetNotes();
  };

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
        {...styles}
      >
        <Link to="/">
          <Heading as="h1" size={['lg', 'xl']} title="Notes App - Go to Home">
            Notes App
          </Heading>
        </Link>

        <Box display="flex" alignItems="center">
          {isNotesPage && (
            <SearchBar />
          )}

          <Link to={isArchivedPage ? '/notes' : '/archives'}>
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={isArchivedPage ? 'Unarchived Notes' : 'Archived Notes'}
              title={isArchivedPage ? 'Unarchived Notes' : 'Archived Notes'}
              variant="ghost"
              color="current"
              ms="3"
              icon={isArchivedPage ? <UnlockIcon /> : <LockIcon />}
            />
          </Link>

          <IconButton
            size="md"
            fontSize="lg"
            aria-label="Refresh Notes"
            title="Refresh Notes"
            variant="ghost"
            color="current"
            onClick={onRefreshHandler}
            icon={<RepeatIcon />}
          />

          <ColorModeSwitcher styles={{ justifySelf: 'flex-end' }} />
        </Box>
      </Container>
    </Box>
  );
};

AppBar.defaultProps = {
  styles: {},
};

AppBar.propTypes = {
  styles: PropTypes.object,
};

export default AppBar;
