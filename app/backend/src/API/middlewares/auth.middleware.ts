// import { type NextFunction, type Request, type Response } from 'express';
// import type IAuth from '../interfaces/IAuth.ts';
// import JwtAuth from '../auth/jwt.auth';

// export default class Authentication {
//   constructor(private readonly auth: IAuth = new JwtAuth()) {}

//   public async authenticate(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { email, password } = req.body;
//       const token = await this.auth.authenticate(email, password);
//       return res.status(200).json({ token });
//     } catch (error) {
//       next(error);
//     }
//   }

//   public async validate(req: Request, res: Response, next: NextFunction) {
//     try {
//       const token = req.header('Authorization') || '';
//       const user = await this.auth.validate(token);
//       req.body.user = user;
//       next(); return;
//     } catch (error) {
//       next(error);
//     }
//   }
// }
