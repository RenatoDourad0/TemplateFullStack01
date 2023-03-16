import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/error.middleware';
import type HttpException from './errors/HttpException.error';
import userRouter from './routes/user.routes';
import loginRouter from './routes/logIn.routes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.use((
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => { errorHandler(err, req, res, next); });

export default app;
