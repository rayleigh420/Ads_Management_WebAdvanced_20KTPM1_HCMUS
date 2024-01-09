import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiResponse } from '../models/responses/base.response';
import reportsServices from '../services/reports.services';
import { ReportReqBody } from '../models/requets/report.requests';
import { getPagingData } from '../utils/paging.utils';

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

export const getReportByConditionController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const reportType = req.query.reportType as string;
    const locationId = req.query.locationId as string;
    const boardId = req.query.boardId as string;
    const limit = parseInt(req.query.limit as string);
    const skip = parseInt(req.query.skip as string);

    const results = await reportsServices.getReportForOfficer(parseInt(locationId, 10), parseInt(boardId, 10));
    const count = results.length;
    let data: any;
    if (limit === 0 && skip === 0) {
      data = results;
    } else {
      data = results.splice(skip, limit);
    }

    const dataPaging = getPagingData({ data, count, limit, skip });
    res.json(ApiResponse.success(dataPaging, 'success'));
  } catch (error) {
    next(error);
  }
}
