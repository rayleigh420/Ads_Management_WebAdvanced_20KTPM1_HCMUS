import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiResponse } from '../models/responses/base.response';
import reportsServices from '../services/reports.services';
import { ReportReqBody } from '../models/requets/report.requests';

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('report', req.body.reportType);
    const result = await reportsServices.createReport(req.body as ReportReqBody, req.file);
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReportAnonymousByConditionController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportType = req.query.reportType;
    const reportId = req.body.reportId;
    if (reportType === 'location') {
      const locationId = req.body.locationId;
      const result = await reportsServices.getReportAnonymousByLocationId(
        parseInt(locationId, 10),
        parseInt(reportId, 10)
      );
      res.json(ApiResponse.success(result, 'success'));
    } else if (reportType === 'board') {
      const boardId = req.body.boardId;
      const result = await reportsServices.getReportAnonymousByBoardId(parseInt(boardId, 10), parseInt(reportId, 10));
      res.json(ApiResponse.success(result, 'success'));
    }
  } catch (error) {
    next(error);
  }
};
