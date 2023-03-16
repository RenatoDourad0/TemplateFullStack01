import { Router, type Request, type Response, type NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import Authentication from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => new Authentication(req, res, next).validate(),
  async (req: Request, res: Response, next: NextFunction) => new UserController(req, res, next).findById(),
);

export default userRouter;
