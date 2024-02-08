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
import { useNavigate } from 'react-router-dom';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';

// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
import ClientError from '../../errors/ClientError';

// Services
import { useAuth } from '../../services/contexts/auth';

// Components
import Alert from '../Alert';

// Utils
import { initYupLocalize } from '../../utils/common';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  initYupLocalize(t);

  const formSchema = object({
    email: string().required(),
    password: string().min(6).required(),
  });

  const toggleShow = (val, handler) => handler(!val);

  const { login } = useAuth();

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate('/');
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
        email: '',
        password: '',
      }}
      validationSchema={formSchema}
      onSubmit={onSubmitHandler}
    >
      {({
        errors, touched, isSubmitting,
      }) => (
        <Box display="flex" flexDir="column" w="500px">
          <Form>
            <Card>
              <CardHeader pb="0">
                <Heading size="lg" textAlign="center">Login</Heading>
              </CardHeader>

              <CardBody>
                <Stack spacing="4">
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

                  <Button
                    type="submit"
                    colorScheme="teal"
                    mt="2"
                    disabled={isSubmitting}
                  >
                    {t('Login')}
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

export default LoginForm;
