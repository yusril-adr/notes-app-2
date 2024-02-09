import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SkipNavContent } from '@chakra-ui/skip-nav';

// Configuration
import CONFIG from '../../global/CONFIG';

// Services
import NotesService from '../../services/api/notes';
// Errors
import ClientError from '../../errors/ClientError';

// Components
import NoteDetail from '../../components/NoteDetail';
import Alert from '../../components/Alert';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { noteId } = useParams();

  const resetAlertMessage = () => setAlertMessage(null);

  const initNote = async () => {
    try {
      setIsLoading(true);

      const { data } = await NotesService.getNoteById(noteId);
      setNote(data);
    } catch (error) {
      if (error instanceof ClientError) {
        setAlertMessage(error.message);
        return;
      }

      setAlertMessage(CONFIG.DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initNote();
  }, []);

  return (
    <>
      <SkipNavContent />
      {note && (<NoteDetail {...note} onUpdate={initNote} />)}
      <Alert message={alertMessage} isLoading={isLoading} onConfirm={resetAlertMessage} />
    </>
  );
};

export default NoteDetailPage;
