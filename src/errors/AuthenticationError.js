import ClientError from './ClientError';

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
