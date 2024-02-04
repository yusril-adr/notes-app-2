import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { SkipNavContent } from '@chakra-ui/skip-nav';

// Services
import { NotesContext } from '../../services/contexts/notes';

// Global Components
import AddNoteForm from '../../components/AddNoteForm';
import NoteList from '../../components/NoteList';

const NotesPage = ({ isArchived }) => {
  const { notes } = useContext(NotesContext);

  const filteredNotes = useMemo(() => (
    notes.items.filter((note) => (
      note.archived === isArchived
      && note.title.toLowerCase().includes(notes.searchKeyword.trim().toLowerCase())
    ))
  ), [notes, isArchived]);

  return (
    <>
      <AddNoteForm styles={{ mt: '16', mb: '20' }} />

      <SkipNavContent />
      <NoteList title={isArchived ? 'Archives' : 'Notes'} notes={filteredNotes} />
    </>
  );
};

NotesPage.defaultProps = {
  isArchived: false,
};

NotesPage.propTypes = {
  isArchived: PropTypes.bool,
};

export default NotesPage;
