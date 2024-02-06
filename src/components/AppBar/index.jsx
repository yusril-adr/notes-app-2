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
  Button,
  Skeleton,
} from '@chakra-ui/react';
import {
  LockIcon,
  RepeatIcon,
  UnlockIcon,
} from '@chakra-ui/icons';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

//  Components
import SearchBar from '../SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';

// Services
import { useAuth } from '../../services/contexts/auth';
import { NotesContext } from '../../services/contexts/notes';

const AppBar = ({ styles }) => {
  const { initNotes, resetNotes } = useContext(NotesContext);
  const bgColor = useColorModeValue('white', 'gray.800');
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { authData } = useAuth();

  const { user, state: userState } = authData;

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
          <Heading
            as="h1"
            size={{
              base: 'md',
              sm: 'sm',
              md: 'lg',
              lg: 'xl',
            }}
            title="Notes App - Go to Home"
          >
            Notes App
          </Heading>
        </Link>

        <Box display="flex" alignItems="center">
          {userState === 'idle' && isNotesPage && (
            <>
              <SearchBar />

              <Link to={isArchivedPage ? '/notes' : '/archives'}>
                <IconButton
                  size="md"
                  fontSize="lg"
                  aria-label={isArchivedPage ? 'Unarchived Notes' : 'Archived Notes'}
                  title={isArchivedPage ? 'Unarchived Notes' : 'Archived Notes'}
                  variant="ghost"
                  color="current"
                  ms={{
                    base: 0,
                    sm: 3,
                  }}
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
            </>
          )}

          {userState !== 'idle' && [0, 1, 2].map((idx) => (
            <Button
              colorScheme="teal"
              variant="ghost"
              ms={idx === 0 ? 0 : 3}
              size={{
                base: 'xs',
                md: 'sm',
              }}
            >
              <Skeleton><Box w="16px" h="16px" /></Skeleton>
            </Button>
          ))}

          <ColorModeSwitcher styles={{ justifySelf: 'flex-end' }} />

          {userState !== 'idle' && (
            <Button
              colorScheme="teal"
              variant="ghost"
              size={{
                base: 'xs',
                md: 'sm',
              }}
            >
              <Skeleton>Sign In</Skeleton>
            </Button>
          )}

          {userState === 'idle' && !user && (
            <>
              <Link to="/login">
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  size={{
                    base: 'xs',
                    md: 'sm',
                  }}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size={{
                    base: 'xs',
                    md: 'sm',
                  }}
                  ms={{
                    base: '1',
                    md: '3',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {userState === 'idle' && user && (
            <Link to="/logout">
              <IconButton
                variant="ghost"
                fontSize="lg"
                size="md"
                aria-label="logout"
                title="logout"
                icon={<BsArrowRightSquareFill />}
              />
            </Link>
          )}
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