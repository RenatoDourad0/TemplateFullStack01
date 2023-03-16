import { type NextFunction, type Request, type Response } from 'express';
import JwtAuth from '../auth/jwt.auth';
import type IUser from '../interfaces/IUser';
import UserService from '../services/user.service';

export default class UserController {
  private readonly req: Request;

  private readonly res: Response;

  private readonly next: NextFunction;

  private readonly service: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new UserService();
  }

  public async findById(): Promise<any> {
    const { id } = this.req.params;
    try {
      const user = await this.service.findById(String(id));
      return this.res.status(200).json(user);
    } catch (error) {
      this.next(error);
    }
  }

  public async findByEmail(): Promise<any> {
    const { email } = this.req.params;
    try {
      const user = await this.service.findByEmail(String(email));
      return this.res.status(200).json(user);
    } catch (error) {
      this.next(error);
    }
  }

  public async create(): Promise<any> {
    const { firstName, lastName, email, password } = this.req.body as Omit<IUser, 'id'>;

    try {
      const user = await this.service.create({ firstName, lastName, email, password });
      const token = await new JwtAuth().authenticate(email, password);
      return this.res.status(201).json({ ...user, token });
    } catch (error) {
      this.next(error);
    }
  }

  // public async listAll(): Promise<Response | undefined> {
  //   try {
  //     const users = await this.service.listAll();
  //     return this.res.status(200).json(users);
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }

  // public async updateById(): Promise<Response | undefined> {
  //   const { id } = this.req.params;
  //   const {
  //     firstName, lastName, email, password
  //   } = this.req.body;

  //   try {
  //     const affectedRows = await this.service.updateById(String(id), { firstName, lastName, email, password });
  //     return this.res.status(200).json({ affectedRows });
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }

  // public async deleteById(): Promise<Response | undefined> {
  //   const { id } = this.req.params;
  //   try {
  //     await this.service.deleteById(String(id));
  //     this.res.status(200).end();
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }
}
