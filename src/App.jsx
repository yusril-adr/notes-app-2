import React, { useEffect, useState } from 'react';
import {
  Container,
} from '@chakra-ui/react';
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav';

// Global Components
import AppBar from './components/AppBar';
import AddNoteForm from './components/AddNoteForm';
import NoteList from './components/NoteList';
import Footer from './components/Footer';

// Services
import NotesService from './services/localStorage/NotesService';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [notes, setNotes] = useState([]);
  const nonArchivedNotes = notes.filter((note) => (
    !note.archived && note.title.toLowerCase().includes(keyword.trim().toLowerCase())
  ));
  const archivedNotes = notes.filter((note) => (
    note.archived && note.title.toLowerCase().includes(keyword.trim().toLowerCase())
  ));

  const updateNotes = () => {
    setNotes(NotesService.getAllNotes());
  };

  useEffect(updateNotes, []);

  return (
    <>
      <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>
      <AppBar maxW="8xl" onSearch={setKeyword} />

      <Container as="main" maxW="8xl">
        <AddNoteForm mt="16" mb="20" onUpdate={updateNotes} />

        <SkipNavContent />
        <NoteList title="Notes" notes={nonArchivedNotes} onUpdate={updateNotes} />

        <NoteList title="Archives" mt="16" notes={archivedNotes} onUpdate={updateNotes} />

      </Container>

      <Footer my="16" />

    </>
  );
};

export default App;
