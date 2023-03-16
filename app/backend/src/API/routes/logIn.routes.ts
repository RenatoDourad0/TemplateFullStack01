import { Router, type Request, type Response, type NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import Authentication from '../middlewares/auth.middleware';

const loginRouter = Router();

loginRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => new UserController(req, res, next).create(),
);

loginRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => new Authentication(req, res, next).authenticate(),
);

export default loginRouter;
