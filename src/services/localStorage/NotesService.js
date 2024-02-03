import { nanoid } from 'nanoid';

// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
import NotFoundError from '../../errors/NotFoundError';

const NotesService = {
  addNote(payload) {
    const notes = this.getAllNotes();
    notes.push({
      ...payload,
      id: nanoid(),
      createdAt: payload.createdAt || new Date(),
      archived: payload.archived || false,
    });
    window.localStorage.setItem(CONFIG.NOTE_SERVICE_KEY, JSON.stringify(notes));
  },

  getAllNotes() {
    const notes = window.localStorage.getItem(CONFIG.NOTE_SERVICE_KEY);
    return JSON.parse(notes) || [];
  },

  updateNoteById(id, payload) {
    const notes = this.getAllNotes();
    const noteIdx = notes.findIndex(({ id: noteId }) => (noteId === id));

    if (noteIdx < 0) {
      throw new NotFoundError('Note not found.');
    }

    const updatedNote = {
      ...notes[noteIdx],
      ...payload,
    };
    notes[noteIdx] = updatedNote;

    window.localStorage.setItem(CONFIG.NOTE_SERVICE_KEY, JSON.stringify(notes));
  },

  deleteNoteById(id) {
    const notes = this.getAllNotes();
    const updatedNotes = notes.filter((note) => (note.id !== id));

    window.localStorage.setItem(CONFIG.NOTE_SERVICE_KEY, JSON.stringify(updatedNotes));
  },
};

export default NotesService;
