import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiResponse } from '../models/responses/base.response';
import reportsServices from '../services/reports.services';
import { ReportReqBody } from '../models/requets/report.requests';

export const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('report', req.body.reportType);
    const deviceId = req.headers.device_id as string;
    const result = await reportsServices.createReport(req.body as ReportReqBody, req.file, deviceId);
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
    // const reportType = req.query.reportType as string;
    const locationId = req.query.locationId as string;
    const boardId = req.query.boardId as string;
    const deviceId = req.headers.device_id as string;
    console.log("🚀 ~ deviceId:", deviceId)
    const result = await reportsServices.getReportAnonymousByDeviceId(deviceId, parseInt(locationId, 10), parseInt(boardId, 10));
    res.json(ApiResponse.success(result, 'success'));
  } catch (error) {
    next(error);
  }
};
