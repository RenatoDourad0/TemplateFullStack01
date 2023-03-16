import 'dotenv/config';
import { type Request, type Response, type NextFunction } from 'express';
import type HttpException from '../errors/HttpException.error';

function errorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Status: ${err.status} --- Message: ${err.message} 
    ----
    ${err.stack as string}`);
  }
  res.status(err.status ?? 500).json({ error: { message: err.message } });
  next();
}

export default errorMiddleware;
