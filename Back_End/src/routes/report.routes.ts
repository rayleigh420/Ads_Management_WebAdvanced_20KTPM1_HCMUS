import { Router } from 'express';
import { wrapRequestHandler } from '../utils/handler.ultil';
import { createReport, getReportAnonymousByConditionController } from '../controllers/reports.controller';
import { createReportValidate } from '../middlewares/report.middlewares';
import multer from 'multer';

const reportsRouter = Router();

// reportsRouter.get('/:id', wrapRequestHandler());
reportsRouter.get('/anonymous', wrapRequestHandler(getReportAnonymousByConditionController));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 2 MB
    files: 1
  }
});
reportsRouter.post('/anonymous', upload.single('file'), createReportValidate, wrapRequestHandler(createReport));

export default reportsRouter;
