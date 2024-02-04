import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';

// Global Components
import NoteItem from '../NoteItem';
import NoteItemEmpty from '../NoteItemEmpty';

const NoteList = ({
  title, notes, ...styles
}) => (
  <Box
    display="flex"
    flexDir="column"
    {...styles}
  >
    <Heading as="h2">
      {title}
    </Heading>

    <Divider mt="4" mb="8" />

    <Grid
      gap="6"
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
    >
      {notes?.length < 1 && (
        <GridItem colSpan={4}>
          <NoteItemEmpty />
        </GridItem>
      )}

      {notes.map((note) => (
        <GridItem key={note.id}>
          <NoteItem
            {...note}
          />
        </GridItem>
      ))}
    </Grid>
  </Box>
);

NoteList.defaultProps = {
  styles: {},
};

NoteList.propTypes = {
  title: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  styles: PropTypes.object,
};

export default NoteList;
