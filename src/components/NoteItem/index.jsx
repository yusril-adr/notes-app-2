/* eslint-disable max-len */
import React from 'react';
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
import NotesService from '../../services/localStorage/NotesService';

// Utils
import DateParser from '../../utils/DateParser';

const NoteItem = ({
  id, title, body, createdAt, archived, onUpdate,
}) => {
  const {
    isOpen: isConfirmDeleteOpen,
    onOpen: openConfirmDelete,
    onClose: closeConfirmDelete,
  } = useDisclosure();

  const onSwitchArchived = () => {
    NotesService.updateNoteById(id, { archived: !archived });
    onUpdate();
  };

  const onDeleteHandler = () => {
    NotesService.deleteNoteById(id);
    closeConfirmDelete();
    onUpdate();
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
    >
      <Heading as="h3" fontSize="lg" wordBreak="break-word">
        {title}
      </Heading>

      <Divider mt="2" />
      <Text mb="4">
        {DateParser.showFormattedDate(createdAt)}
      </Text>

      <Text
        wordBreak="break-word"
      >
        {body}
      </Text>

      <Divider mt="4" mb="4" />

      <ButtonGroup
        variant="outline"
        spacing="6"
        w="100%"
        display="flex"
      >
        <Button colorScheme="red" w="50%" onClick={openConfirmDelete}>Delete</Button>
        <Button colorScheme="teal" w="50%" onClick={onSwitchArchived}>{archived ? 'Unarchive' : 'Archive'}</Button>
      </ButtonGroup>

      <Modal isOpen={isConfirmDeleteOpen} onClose={closeConfirmDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You won't be able to revert this!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDeleteHandler}>
              Yes, delete it!
            </Button>
            <Button variant="ghost" onClick={closeConfirmDelete}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NoteItem;
