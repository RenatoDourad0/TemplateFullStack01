import 'dotenv/config.js';
import { type Request, type Response, type NextFunction } from 'express';
import type HttpException from '../errors/HttpException.error';

function errorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Status: ${err.status} --- Message: ${err.message} 
    ----
    ${err.stack}`);
  }
  return res.status(err.status || 500).json({ error: { message: err.message } });
}

export default errorMiddleware;
