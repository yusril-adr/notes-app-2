/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Utils
import DateParser from '../../utils/DateParser';

const NoteItem = ({
  id, title, body, createdAt,
}) => {
  const { t } = useTranslation();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      h="100%"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Box>
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
      </Box>

      <Box>
        <Divider mt="4" mb="4" />

        <Link to={`/note/${id}`}>
          <Button colorScheme="blue" variant="outline" w="100%">{t('Detail')}</Button>
        </Link>
      </Box>
    </Box>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
