// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
import ClientError from '../../errors/ClientError';

// Utils
import { fetchWithToken } from './utils';

const {
  DICODING_BASE_URL: BASE_URL,
} = CONFIG.SERVICES.API;

const NotesService = {
  async createNote({ title, body }) {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async getNonArchivedNotes() {
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async getArchivedNotes() {
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async getNoteById(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async archiveNoteById(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async unarchiveNoteById(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async deleteNoteById(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },
};

export default NotesService;
