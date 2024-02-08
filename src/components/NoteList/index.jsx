import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Divider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// Components
import NoteItem from '../NoteItem';
import NoteItemEmpty from '../NoteItemEmpty';

// Hooks

const NoteList = ({
  isArchived,
  notes,
  ...styles
}) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDir="column"
      {...styles}
    >
      <Heading as="h2">
        {isArchived ? t('Archives') : t('Notes')}
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

        {notes?.map((note) => (
          <GridItem key={note.id}>
            <NoteItem
              {...note}
            />
          </GridItem>
        ))}
      </Grid>

    </Box>
  );
};

NoteList.defaultProps = {
  isArchived: false,
  styles: {},
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  isArchived: PropTypes.bool,
  styles: PropTypes.object,
};

export default NoteList;
