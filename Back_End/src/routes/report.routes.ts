import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { createReport } from '../controllers/reports.controller';
import { createReportValidate } from '../middlewares/report.middlewares';

const reportsRouter = Router();

// reportsRouter.get('/', wrapRequestHandler());
// reportsRouter.get('/:id', wrapRequestHandler());

reportsRouter.post('/', createReportValidate, wrapRequestHandler(createReport));

export default reportsRouter;
