import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  FormErrorMessage,
  InputGroup,
  Input,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react';
import {
  AddIcon,
} from '@chakra-ui/icons';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

// Services
import NotesService from '../../services/api/notes';

// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
import ClientError from '../../errors/ClientError';

// Components
import Alert from '../Alert';

const formSchema = object({
  title: string().max(CONFIG.NOTES_TITLE_MAX_LENGTH).required(),
  body: string().required(),
});

const AddNoteForm = ({ isArchived, onSubmit, styles }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetAlertMessage = () => {
    setAlertMessage(null);
  };

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data } = await NotesService.createNote(values);

      if (isArchived) {
        await NotesService.archiveNoteById(data.id);
      }

      setSubmitting(false);
      resetForm();
      onClose();
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      setSubmitting(false);
      if (error instanceof ClientError) {
        setAlertMessage(error.message);
        return;
      }

      setAlertMessage(CONFIG.DEFAULT_ERROR_MESSAGE);
    }
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...styles}
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

      <Formik
        initialValues={{
          title: '',
          body: '',
        }}
        validationSchema={formSchema}
        onSubmit={onSubmitHandler}
        onReset={onCancelHandler}
      >
        {({
          errors, touched, values, isSubmitting,
        }) => (
          <Modal
            isOpen={isOpen}
            onClose={onCancelHandler}
          >
            <ModalOverlay />

            <Form>
              <ModalContent>
                <ModalHeader>New Note</ModalHeader>

                <ModalCloseButton />

                <ModalBody pb={6}>

                  <Field name="title">
                    {({ field }) => (
                      <FormControl isInvalid={errors.title && touched.title}>
                        <FormLabel>Title</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            placeholder="Title"
                            maxLength={CONFIG.NOTES_TITLE_MAX_LENGTH}
                          />
                          <InputRightElement>
                            {CONFIG.NOTES_TITLE_MAX_LENGTH - values.title.length}
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="body">
                    {({ field }) => (
                      <FormControl mt="4" isInvalid={errors.body && touched.body}>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...field} name="body" placeholder="Description" />
                        <FormErrorMessage>{errors.body}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" colorScheme="teal" mr={3} disabled={isSubmitting}>
                    Save
                  </Button>
                  <Button type="reset">Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Form>

            <Alert message={alertMessage} isLoading={isSubmitting} onConfirm={resetAlertMessage} />
          </Modal>
        )}

      </Formik>
    </Box>
  );
};

AddNoteForm.defaultProps = {
  isArchived: false,
  onSubmit: null,
  styles: {},
};

AddNoteForm.propTypes = {
  isArchived: PropTypes.bool,
  onSubmit: PropTypes.func,
  styles: PropTypes.object,
};

export default AddNoteForm;
