import { useState } from 'react';

// Configutation
import CONFIG from '../global/CONFIG';

// Services
import NotesService from '../services/api/notes';

// Errors
import ClientError from '../errors/ClientError';

export default () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const resetAlertMessage = () => {
    setAlertMessage(null);
  };

  const handleInitNotes = async (isArchived) => {
    try {
      let notesData;
      setIsLoading(true);

      if (isArchived) {
        notesData = (await NotesService.getArchivedNotes()).data;
      } else {
        notesData = (await NotesService.getNonArchivedNotes()).data;
      }
      setNotes(notesData);
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

  return {
    notes,
    setNotes,
    isLoading,
    setIsLoading,
    alertMessage,
    setAlertMessage,
    resetAlertMessage,
    handleInitNotes,
  };
};
