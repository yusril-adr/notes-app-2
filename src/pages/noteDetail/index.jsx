import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { SkipNavContent } from '@chakra-ui/skip-nav';

// Services
import { NotesContext } from '../../services/contexts/notes';

// Components
import NoteDetail from '../../components/NoteDetail';

// Errors
import NotFoundError from '../../errors/NotFoundError';

const NoteDetailPage = () => {
  const { notes } = useContext(NotesContext);
  const { noteId } = useParams();

  const note = useMemo(() => (
    notes.items.find((item) => (
      item.id === noteId
    ))
  ), [notes]);

  if (!note && notes.state === 'idle') {
    throw new NotFoundError('Note not found');
  }

  return (
    <>
      <SkipNavContent />
      {(note && notes.state === 'idle') && (
        <NoteDetail {...note} />
      )}
    </>
  );
};

export default NoteDetailPage;
