import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useSearchParams } from 'react-router-dom';

import { SkipNavContent } from '@chakra-ui/skip-nav';

// Hooks
import useNotes from '../../hooks/useNotes';

// Components
import AddNoteForm from '../../components/AddNoteForm';
import NoteList from '../../components/NoteList';
import Alert from '../../components/Alert';

const NotesPage = ({ isArchived }) => {
  const {
    notes: noteData,
    isLoading,
    alertMessage,
    resetAlertMessage,
    handleInitNotes,
  } = useNotes();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    handleInitNotes(isArchived);
  }, [searchParams, location]);

  const notes = useMemo(() => {
    const searchKeyword = searchParams.get('search');

    let result = noteData;

    if (searchKeyword) {
      result = noteData.filter(({ title }) => (
        title.toLowerCase().trim() === searchKeyword.toLowerCase().trim()
      ));
    }

    return result;
  }, [noteData]);

  const onSubmitHandler = () => handleInitNotes(isArchived);

  return (
    <>
      <AddNoteForm styles={{ mt: '16', mb: '20' }} onSubmit={onSubmitHandler} />

      <SkipNavContent />
      <NoteList isArchived={isArchived} notes={notes} />

      <Alert message={alertMessage} isLoading={isLoading} onConfirm={resetAlertMessage} />
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
