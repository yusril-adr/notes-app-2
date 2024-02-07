import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';

// Services
import { useAuth } from './services/contexts/auth';

// Components
import GlobalLayout from './layouts/GlobalLayout';

import ProtectedRoutes from './routes/ProtectedRoutes';

import NotFoundPage from './pages/notFound';
import LoadingPage from './pages/loadingPage';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import LogOutPage from './pages/logout';

import NotesPage from './pages/notes';
import NoteDetailPage from './pages/noteDetail';

const App = () => {
  const { authData, getUserLogged } = useAuth();
  const { user, state } = authData;

  useEffect(() => {
    (async () => {
      await getUserLogged();
    })();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<GlobalLayout />}>
        <Route element={state !== 'init' ? <Outlet /> : <LoadingPage />}>
          {user && (
          <Route path="" element={<Navigate to="/notes" />} />
          )}

          {!user && (
          <Route path="" element={<Navigate to="/login" />} />
          )}

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          />

          <Route element={<ProtectedRoutes redirectPath="/" />}>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/archives" element={<NotesPage isArchived />} />
            <Route path="/note/:noteId" element={<NoteDetailPage />} errorElement={<NotFoundPage />} />
          </Route>

          <Route path="/logout" element={<LogOutPage />} />
          <Route path="*" element={state === 'idle' ? <LoadingPage /> : <NotFoundPage />} />
        </Route>
      </Route>,
    ),
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
