import HttpException from './HttpException.error';

export default class NotFoundError extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}
