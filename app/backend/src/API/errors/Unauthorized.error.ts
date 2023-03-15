import HttpException from './HttpException.error';

export default class UnauthorizedError extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}
