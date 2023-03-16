import { type NextFunction, type Request, type Response } from 'express';
import type IAuth from '../interfaces/IAuth';
import JwtAuth from '../auth/jwt.auth';
import type IUser from '../interfaces/IUser';

export default class Authentication {
  private readonly auth: IAuth;

  private readonly req: Request;

  private readonly res: Response;

  private readonly next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.auth = new JwtAuth();
  }

  public async authenticate(): Promise<any> {
    try {
      const { email, password } = this.req.body as Pick<IUser, 'email' | 'password'>;
      const token = await this.auth.authenticate(email, password);
      return this.res.status(200).json({ token });
    } catch (error) {
      this.next(error);
    }
  }

  public async validate(): Promise<void> {
    try {
      const token = this.req.header('Authorization') ?? '';
      const user = await this.auth.validate(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.req.body.user = user;
      this.next();
    } catch (error) {
      this.next(error);
    }
  }
}
