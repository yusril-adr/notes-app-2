const CONFIG = {
  NOTES_TITLE_MAX_LENGTH: 50,
  SERVICES: {
    API: {
      DICODING_BASE_URL: 'https://notes-api.dicoding.dev/v1',
    },
    LOCAL_STORAGE: {
      TOKEN_KEY: 'access_token',
      NOTE_SERVICE_KEY: 'notes',
      LOCALIZE_KEY: 'lang',
    },
    LOCALIZE: {
      DEFAULT_LANG: 'en',
      SECOND_LANG: 'id',
    },
  },
  MAX_BODY_HEIGHT: 'calc(100vh - 283px)',
  DEFAULT_ERROR_MESSAGE: 'Something went wrong with the server.',
};

export default CONFIG;
