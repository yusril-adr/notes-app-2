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

const Alert = ({
  title,
  message,
  isLoading,
  onConfirm,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                Okay!
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

Alert.defaultProps = {
  title: 'Notification',
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
