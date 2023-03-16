import 'dotenv/config';
import { sign, verify, type SignOptions, type JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { BadRequestError, UnauthorizedError } from '../errors';
import type IAuth from '../interfaces/IAuth';
import UserService from '../services/user.service';
import type User from '../domains/User';

type JwtReturn = (JwtPayload & { id: number });

export default class JwtAuth implements IAuth {
  private readonly userService = new UserService();

  private readonly isBodyValid = (email: string, password: string): boolean => !!(email && password);

  private readonly secret = process.env.JWT_SECRET ?? '';

  async authenticate(email: string, password: string): Promise<string> {
    if (!this.isBodyValid(email, password)) {
      throw new BadRequestError('email ou senha não identificados');
    }

    const user = await this.userService.findByEmail(email);

    if ((user == null) || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }
    const { id, firstName, lastName, email: dbMail } = user;

    const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
    const token = sign({ id, firstName, lastName, dbMail }, this.secret, jwtConfig);
    return token;
  }

  async validate(token: string): Promise<User> {
    if (token.length === 0) {
      throw new BadRequestError('Token inexistente');
    }

    let decoded;
    try {
      decoded = verify(token, this.secret) as JwtReturn;
    } catch (error) {
      throw new UnauthorizedError('Token inválido');
    }

    const user = await this.userService.findById(String(decoded.id));
    if ((user == null) || user.email !== decoded.dbMail) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }
    return user;
  }
}
