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

// Utils
import DateParser from '../../utils/DateParser';

const NoteItem = ({
  id, title, body, createdAt,
}) => (
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

    <Link to={`/note/${id}`}>
      <Button colorScheme="blue" variant="outline" w="100%">Detail</Button>
    </Link>
  </Box>
);

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
