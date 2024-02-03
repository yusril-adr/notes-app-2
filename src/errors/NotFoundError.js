import ClientError from './ClientError';

class NotFoundError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
