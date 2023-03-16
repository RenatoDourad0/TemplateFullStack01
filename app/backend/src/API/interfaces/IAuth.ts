import type User from '../domains/User';
import { type HttpException } from '../errors';

export default interface IAuth {
  authenticate: (email: string, password: string) => Promise<(string | HttpException)>
  validate: (token: string) => Promise<(User | HttpException)>
}
