// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
// import NotFoundError from '../../errors/NotFoundError';

const {
  DICODING_BASE_URL: BASE_URL,
} = CONFIG.SERVICES.API;

const NotesService = {
  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  },
};

export default NotesService;
