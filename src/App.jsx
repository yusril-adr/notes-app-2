import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Components
import GlobalLayout from './layouts/GlobalLayout';
import NotesPage from './pages/notes';
import NotFoundPage from './pages/notFound';
import NoteDetailPage from './pages/noteDetail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GlobalLayout />}>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="archives" element={<NotesPage isArchived />} />
      <Route path="/note/:noteId" element={<NoteDetailPage />} errorElement={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
