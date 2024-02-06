import React, {
  useState,
  createContext,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

// Services
import NotesService from '../localStorage/NotesService';
// import NotesService from '../memoryStorage/NotesService';
import { convertSearchParams } from '../../utils/common';

const defaultValue = {
  items: [],
  searchKeyword: '',
  state: 'init',
};

export const NotesContext = createContext(defaultValue);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(defaultValue);

  const initNotes = () => {
    const defaultItems = NotesService.getAllNotes();
    const searchParams = new URLSearchParams(window.location.search);

    const convertedSearchParams = convertSearchParams(searchParams);
    setNotes({
      ...notes,
      items: defaultItems,
      searchKeyword: convertedSearchParams?.search || '',
      state: 'idle',
    });
  };

  const resetNotes = () => {
    setNotes(defaultValue);
    initNotes();
  };

  const addNote = (payload) => {
    NotesService.addNote(payload);
    initNotes();
  };

  const updateNoteById = (id, payload) => {
    NotesService.updateNoteById(id, payload);
    initNotes();
  };

  const deleteNoteById = (id, payload) => {
    NotesService.deleteNoteById(id, payload);
    initNotes();
  };

  const providerValue = useMemo(() => ({
    notes,
    setNotes,
    resetNotes,
    addNote,
    updateNoteById,
    deleteNoteById,
    initNotes,
  }), [notes]);

  return (
    <NotesContext.Provider value={providerValue}>
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
