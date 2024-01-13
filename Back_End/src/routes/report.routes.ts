import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import {
  createReport,
  getReportAnonymousByConditionController,
  getReportByConditionController,
  getReportByIdController,
  updateReportController,
} from '../controllers/reports.controller';
import { createReportValidate } from '../middlewares/report.middlewares';
import multer from 'multer';
import { accessTokenValidator } from '../middlewares/users.middlewares';
import { getBoardByIdController } from '../controllers/boards.controllers';
import { getReportStat } from '../controllers/admins.controllers';

const reportsRouter = Router();

// anonymous
// reportsRouter.get('/:id', wrapRequestHandler(getReportByIdController))
reportsRouter.get('/anonymous', wrapRequestHandler(getReportAnonymousByConditionController));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 2 MB
    files: 2,
  },
});
reportsRouter.post('/anonymous', upload.array('file', 2), createReportValidate, wrapRequestHandler(createReport));

//officer
reportsRouter.get('/officer', accessTokenValidator, wrapRequestHandler(getReportByConditionController));
reportsRouter.patch('/officer', accessTokenValidator, wrapRequestHandler(updateReportController));
reportsRouter.get('/:id', wrapRequestHandler(getReportByIdController));


export default reportsRouter;
