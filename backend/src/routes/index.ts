import express,{ Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import upload from '../config/upload';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/files',express.static(upload.directory))
routes.use('/sessions', sessionsRouter);

export default routes;
