import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';

const NoteItemEmpty = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Text>
      This List is empty right now.
    </Text>
  </Box>
);

export default NoteItemEmpty;
