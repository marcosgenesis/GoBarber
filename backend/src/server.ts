import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import './database';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    error: 'error',
    message: 'Internal Server Error',
  });
});
app.listen(3333);
