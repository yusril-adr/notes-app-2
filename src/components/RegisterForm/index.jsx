import React, { useState } from 'react';
import {
  Heading,
  Box,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
} from '@chakra-ui/react';
import {
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
import ClientError from '../../errors/ClientError';

// Services
import { useAuth } from '../../services/contexts/auth';

// Components
import Alert from '../Alert';

const formSchema = object({
  name: string().required(),
  email: string().required(),
  password: string().min(6).required(),
  confirmPassword: string().min(6).required(),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { t } = useTranslation();

  const toggleShow = (val, handler) => handler(!val);

  const { register } = useAuth();

  const validateConfirmPassword = (password, confirmPassword) => {
    let error;
    if (password !== confirmPassword) {
      error = t('Confirm Password failed.');
    }

    return error;
  };

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      await register(values);
      setAlertMessage(t('Register Success.'));
      resetForm();
    } catch (error) {
      if (error instanceof ClientError) {
        return setAlertMessage(error.message);
      }

      setAlertMessage(t(CONFIG.DEFAULT_ERROR_MESSAGE));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={formSchema}
      onSubmit={onSubmitHandler}
    >
      {({
        errors, touched, values, isSubmitting,
      }) => (
        <Box display="flex" flexDir="column" w="500px">
          <Form>
            <Card>
              <CardHeader pb="0">
                <Heading size="lg" textAlign="center">{t('Register')}</Heading>
              </CardHeader>

              <CardBody>
                <Stack spacing="4">
                  <Field name="name">
                    {({ field }) => (
                      <FormControl isInvalid={errors.name && touched.name}>
                        <FormLabel>{t('Username')}</FormLabel>
                        <Input {...field} type="text" autoComplete="off" />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field }) => (
                      <FormControl isInvalid={errors.email && touched.email}>
                        <FormLabel>{t('Email Address')}</FormLabel>
                        <Input {...field} type="email" autoComplete="off" />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }) => (
                      <FormControl isInvalid={errors.password && touched.password}>
                        <FormLabel>{t('Password')}</FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={showPass ? 'text' : 'password'}
                            placeholder={t('Enter password')}
                          />
                          <InputRightElement>
                            <Button
                              title={showPass ? t('Hide password') : t('Show Password')}
                              onClick={() => toggleShow(showPass, setShowPass)}
                            >
                              {showPass ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="confirmPassword" validate={(value) => validateConfirmPassword(values.password, value)}>
                    {({ field }) => (
                      <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword}>
                        <FormLabel>{t('Confirm Password')}</FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={showConfirmPass ? 'text' : 'password'}
                            placeholder={t('Confirm your password')}
                          />
                          <InputRightElement>
                            <Button
                              title={showConfirmPass ? t('Hide password') : t('Show Password')}
                              onClick={() => toggleShow(showConfirmPass, setShowConfirmPass)}
                            >
                              {showConfirmPass ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    mt="2"
                    disabled={isSubmitting}
                  >
                    {t('Register')}
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </Form>

          <Alert message={alertMessage} isLoading={isSubmitting} />
        </Box>
      )}

    </Formik>
  );
};

export default RegisterForm;
