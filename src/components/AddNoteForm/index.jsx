import React, { useState } from 'react';
import {
  useDisclosure,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react';
import {
  AddIcon,
} from '@chakra-ui/icons';

// Services
import NotesService from '../../services/localStorage/NotesService';
import CONFIG from '../../global/CONFIG';

const defaultInputsValue = {
  title: '',
  body: '',
};

const AddNoteForm = ({ onUpdate, ...props }) => {
  const [inputsValue, setInputsValue] = useState(defaultInputsValue);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onInputChangeHandler = (event) => {
    const key = event.target.name;

    const newInputsValue = { ...inputsValue };
    newInputsValue[key] = event.target.value;

    setInputsValue(newInputsValue);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    NotesService.addNote(inputsValue);
    onClose();
    setInputsValue(defaultInputsValue);
    onUpdate();
  };

  const onCancelHandler = () => {
    onClose();
    setInputsValue(defaultInputsValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Button
        colorScheme="teal"
        textColor="white"
        variant="solid"
        size="lg"
        bgGradient="linear(to-r, teal.500, green.500)"
        _hover={{
          bgGradient: 'none',
          textColor: 'black',
        }}
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Add Note
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onCancelHandler}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={onSubmitHandler}>
          <ModalHeader>New Note</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <InputGroup>
                <Input
                  required
                  name="title"
                  placeholder="Title"
                  maxLength={CONFIG.NOTES_TITLE_MAX_LENGTH}
                  onChange={onInputChangeHandler}
                />
                <InputRightElement>
                  {CONFIG.NOTES_TITLE_MAX_LENGTH - inputsValue.title.length}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea required name="body" placeholder="Description" onChange={onInputChangeHandler} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button onClick={onCancelHandler}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddNoteForm;
