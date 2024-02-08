import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// Services
import i18n from '../../services/localization/il18n';

const Alert = ({
  title,
  message,
  isLoading,
  onConfirm,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation;

  useEffect(() => {
    if (message || isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [message, isLoading]);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" {...isLoading && { textAlign: 'center ' }}>
            {isLoading ? 'Loading...' : title}
          </AlertDialogHeader>

          <AlertDialogBody
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            {isLoading && <Spinner size="xl" mb="8" />}
            {!isLoading && <Text>{message}</Text>}
          </AlertDialogBody>

          <AlertDialogFooter>
            {!isLoading && message && (
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  onClose();
                  if (onConfirm) {
                    onConfirm();
                  }
                }}
              >
                {t('Okay!')}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

Alert.defaultProps = {
  title: i18n.t('Notification'),
  message: '',
  isLoading: false,
  onConfirm: null,
};

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default Alert;
