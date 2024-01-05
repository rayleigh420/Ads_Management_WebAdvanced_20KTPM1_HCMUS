import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiResponse } from '../models/responses/base.response';
import reportsServices from '../services/reports.services';
import { ReportReqBody } from '../models/requets/report.requests';

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsServices.createReport(req.body as ReportReqBody, req.file);
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
