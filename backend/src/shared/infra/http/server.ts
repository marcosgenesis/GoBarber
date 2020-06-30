import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(errors());
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
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
  },
);

app.listen(3333);
