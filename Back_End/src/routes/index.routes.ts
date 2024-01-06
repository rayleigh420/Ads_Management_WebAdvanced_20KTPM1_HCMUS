import { Router } from 'express';
import usersRouter from './users.routes';
import boardsRouter from './board.routes';
import reportsRouter from './report.routes';
import locationsRoute from './location.routes';

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/boards', boardsRouter);
indexRouter.use('/reports', reportsRouter);
indexRouter.get('/locations', locationsRoute);

export default indexRouter;
