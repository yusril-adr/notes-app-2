/* eslint-disable max-len */
import React, { useContext } from 'react';
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

// Services
import { NotesContext } from '../../services/contexts/notes';

// Utils
import DateParser from '../../utils/DateParser';

const NoteDetail = ({
  id, title, body, createdAt, archived,
}) => {
  const {
    isOpen: isConfirmDeleteOpen,
    onOpen: openConfirmDelete,
    onClose: closeConfirmDelete,
  } = useDisclosure();
  const { updateNoteById, deleteNoteById } = useContext(NotesContext);
  const navigate = useNavigate();

  const onSwitchArchived = () => {
    updateNoteById(id, { archived: !archived });
  };

  const onDeleteHandler = () => {
    deleteNoteById(id);
    closeConfirmDelete();
    navigate(archived ? '/archives' : '/');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="calc(100vh - 283px)"
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
            Delete
          </Button>
          <Button colorScheme="teal" w="50%" onClick={onSwitchArchived}>
            {archived ? 'Unarchive' : 'Archive'}
          </Button>
        </ButtonGroup>

        <Modal isOpen={isConfirmDeleteOpen} onClose={closeConfirmDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>You won't be able to revert this!</ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onDeleteHandler}>
                Yes, delete it!
              </Button>
              <Button variant="ghost" onClick={closeConfirmDelete}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteDetail;
