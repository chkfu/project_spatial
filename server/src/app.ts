import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import userRouter from '../src/routes/usersRoute.js';

const app: Express = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

// ROUTER
app.use('/api/v1/users', userRouter);

export default app;
