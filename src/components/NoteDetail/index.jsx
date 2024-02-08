/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  useDisclosure,
  Box,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// Configuration
import CONFIG from '../../global/CONFIG';

// Services
import NotesService from '../../services/api/notes';

// Utils
import DateParser from '../../utils/DateParser';

// Errors
import ClientError from '../../errors/ClientError';
import Alert from '../Alert';

const NoteDetail = ({
  id, title, body, createdAt, archived, onUpdate,
}) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isConfirmDeleteOpen,
    onOpen: openConfirmDelete,
    onClose: closeConfirmDelete,
  } = useDisclosure();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resetAlertMessage = () => setAlertMessage(null);

  const onSwitchArchived = async () => {
    try {
      setIsLoading(true);

      if (archived) {
        await NotesService.unarchiveNoteById(id);
      } else {
        await NotesService.archiveNoteById(id);
      }

      if (onUpdate) onUpdate();
    } catch (error) {
      if (error instanceof ClientError) {
        setAlertMessage(error.message);
        return;
      }

      setAlertMessage(t(CONFIG.DEFAULT_ERROR_MESSAGE));
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteHandler = async () => {
    try {
      setIsLoading(true);

      await NotesService.deleteNoteById(id);

      closeConfirmDelete();
      navigate(archived ? '/archives' : '/notes');
    } catch (error) {
      if (error instanceof ClientError) {
        setAlertMessage(error.message);
        return;
      }

      setAlertMessage(t(CONFIG.DEFAULT_ERROR_MESSAGE));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH={CONFIG.MAX_BODY_HEIGHT}
      px={4}
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        minW="100%"
      >
        <Heading as="h3" fontSize="lg" wordBreak="break-word">
          {title}
        </Heading>

        <Divider mt="2" />
        <Text mb="4">{DateParser.showFormattedDate(createdAt)}</Text>

        <Text wordBreak="break-word" minH="300px">{body}</Text>

        <Divider mt="4" mb="4" />

        <ButtonGroup variant="outline" spacing="6" display="flex">
          <Button colorScheme="red" w="50%" onClick={openConfirmDelete}>
            {t('Delete')}
          </Button>
          <Button colorScheme="teal" w="50%" onClick={onSwitchArchived}>
            {archived ? t('Unarchive') : t('Archive')}
          </Button>
        </ButtonGroup>

        <Modal isOpen={isConfirmDeleteOpen} onClose={closeConfirmDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t('Are you sure?')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{t("You won't be able to revert this!")}</ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onDeleteHandler}>
                {t('Yes, delete it!')}
              </Button>
              <Button variant="ghost" onClick={closeConfirmDelete}>
                {t('Cancel')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Alert message={alertMessage} isLoading={isLoading} onConfirm={resetAlertMessage} />
    </Box>
  );
};

NoteDetail.defaultProps = {
  onUpdate: null,
};

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
};

export default NoteDetail;
