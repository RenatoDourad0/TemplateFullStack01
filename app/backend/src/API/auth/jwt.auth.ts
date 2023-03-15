// import 'dotenv/config';
// import { sign, verify, type SignOptions, type JwtPayload } from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';
// import { BadRequestError, UnauthorizedError, type HttpException } from '../errors';
// import type IAuth from '../interfaces/IAuth';
// import userService from '../services/user.service';
// import type User from '../domains/User';

// type jwtReturn = (JwtPayload & { id: number });

// export default class JwtAuth implements IAuth {
//   private readonly isBodyValid = (email: string, password: string) => email && password;

//   private readonly secret = process.env.JWT_SECRET || '';

//   async authenticate(email: string, password: string): Promise<(string | HttpException)> {
//     if (!this.isBodyValid(email, password)) {
//       throw new BadRequestError('All fields must be filled');
//     }

//     const user = await userService.findByEmail(email);
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       throw new UnauthorizedError('Incorrect email or password');
//     }
//     const { id, username, email: dbMail } = user;

//     const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };
//     const token = sign({ id, username, dbMail }, this.secret, jwtConfig);
//     return token;
//   }

//   async validate(token: string): Promise<(User | HttpException)> {
//     if (token.length === 0) {
//       throw new BadRequestError('All fields must be filled');
//     }

//     let decoded;
//     try {
//       decoded = verify(token, this.secret) as jwtReturn;
//     } catch (error) {
//       throw new UnauthorizedError('Incorrect email or password');
//     }

//     const user = await userService.findById(decoded.id);
//     if (!user || user.email !== decoded.dbMail) {
//       throw new UnauthorizedError('Incorrect email or password');
//     }
//     return user;
//   }
// }
