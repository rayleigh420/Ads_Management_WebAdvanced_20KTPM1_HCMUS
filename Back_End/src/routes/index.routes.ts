import { Router } from 'express';
import usersRouter from './users.routes';
import boardsRouter from './board.routes';

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.get('/boards', boardsRouter);

export default indexRouter
