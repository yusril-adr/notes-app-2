import React, {
  useMemo,
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
  UnlockIcon,
} from '@chakra-ui/icons';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import Tooltip from '../Tooltip';
import SearchBar from '../SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';
import LangModeSwitcher from '../LangModeSwitcher';

// Services
import { useAuth } from '../../services/contexts/auth';

const AppBar = ({ styles }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const location = useLocation();
  const { t } = useTranslation();

  const { authData } = useAuth();

  const { user, state: userState } = authData;

  const isArchivedPage = useMemo(() => (
    location.pathname === '/archives'
  ), [location]);

  const isNotesPage = useMemo(() => (
    location.pathname === '/archives'
    || location.pathname === '/notes'
    || location.pathname.startsWith('/note/')
  ), [location]);

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
            title={t('Notes App - Go to Home')}
          >
            {t('Notes App')}
          </Heading>
        </Link>

        <Box display="flex" alignItems="center">
          {userState === 'idle' && isNotesPage && (
            <>
              {!location.pathname.startsWith('/note/') && (<SearchBar />)}

              {(isArchivedPage || location.pathname.startsWith('/note/')) && (
                <Tooltip label={isArchivedPage ? t('Unarchived Notes') : t('Archived Notes')}>
                  <Link to="/notes">
                    <IconButton
                      size="md"
                      fontSize="lg"
                      aria-label={isArchivedPage ? t('Unarchived Notes') : t('Archived Notes')}
                      title={isArchivedPage ? t('Unarchived Notes') : t('Archived Notes')}
                      variant="ghost"
                      color="current"
                      ms={{
                        base: 0,
                        sm: location.pathname.startsWith('/note/') ? 0 : 3,
                      }}
                      icon={<UnlockIcon />}
                    />
                  </Link>
                </Tooltip>
              )}

              {!isArchivedPage && !location.pathname.startsWith('/note/') && (
                <Tooltip label={isArchivedPage ? t('Unarchived Notes') : t('Archived Notes')}>
                  <Link to="/archives">
                    <IconButton
                      size="md"
                      fontSize="lg"
                      aria-label={isArchivedPage ? t('Unarchived Notes') : t('Archived Notes')}
                      title={isArchivedPage ? t('Unarchived Notes') : t('Archived Notes')}
                      variant="ghost"
                      color="current"
                      ms={{
                        base: 0,
                        sm: 3,
                      }}
                      icon={<LockIcon />}
                    />
                  </Link>
                </Tooltip>
              )}
            </>
          )}

          {userState !== 'idle' && [0, 1, 2].map((idx) => (
            <Button
              key={idx}
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
          <LangModeSwitcher styles={{ justifySelf: 'flex-end' }} />

          {userState !== 'idle' && (
            <Button
              colorScheme="teal"
              variant="ghost"
              size={{
                base: 'xs',
                md: 'sm',
              }}
            >
              <Skeleton>{t('Sign In')}</Skeleton>
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
                  {t('Sign In')}
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
                  {t('Sign Up')}
                </Button>
              </Link>
            </>
          )}

          {userState === 'idle' && user && (
            <Tooltip label={t('Logout')}>
              <Link to="/logout">
                <IconButton
                  variant="ghost"
                  fontSize="lg"
                  size="md"
                  aria-label={t('Logout')}
                  title={t('Logout')}
                  icon={<BsArrowRightSquareFill />}
                />
              </Link>
            </Tooltip>
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
